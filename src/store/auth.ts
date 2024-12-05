import { supabase } from "@/utils/supabase";
import { atomWithQuery } from "jotai-tanstack-query";
import { atom } from "jotai";
import * as jose from "jose";

type Account = {
  id: string;
  email: string;
  password: string;
  accountType: string;
  businessAffiliated: string;
  companyRole: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: Account;
  token: string;
};

const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);

// atoms for login state
export const userAtom = atom<string | null>(null);
export const isAuthenticatedAtom = atom(false);
export const loadingAtom = atom(false);
export const errorAtom = atom<string | null>(null);

// Query atom for accounts
export const accountsAtom = atomWithQuery((get) => ({
  queryKey: ["accounts"],
  queryFn: async () => {
    const { data, error } = await supabase.from("Accounts").select("*");
    if (error) throw error;
    return data as Account[];
  },
}));

// Login function
const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data: user, error: fetchError } = await supabase
    .from("Accounts")
    .select("*")
    .eq("email", credentials.email)
    .single();

  if (fetchError) throw new Error("Authentication failed");
  if (!user) throw new Error("User not found");

  if (user.password !== credentials.password) {
    throw new Error("Invalid credentials");
  }

  // Create JWT using jose
  const token = await new jose.SignJWT({
    userId: user.id,
    email: user.email,
    accountType: user.account_type,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(secret);

  return { user, token };
};

// Login atom
export const loginAtom = atom(null, async (get, set, credentials: LoginCredentials) => {
  try {
    set(loadingAtom, true);
    set(errorAtom, null);

    const { user, token } = await loginUser(credentials);

    set(userAtom, user.id);
    set(isAuthenticatedAtom, true);

    // Store the token
    localStorage.setItem("auth_token", token);

    return user;
  } catch (error) {
    set(errorAtom, error instanceof Error ? error.message : "Login failed");
    throw error;
  } finally {
    set(loadingAtom, false);
  }
});

// Logout atom
export const logoutAtom = atom(null, async (get, set) => {
  try {
    // Sign out from Supabase
    await supabase.auth.signOut();

    set(userAtom, null);
    set(isAuthenticatedAtom, false);
    set(errorAtom, null);
    localStorage.removeItem("auth_token");
  } catch (error) {
    console.error("Logout error:", error);
    set(errorAtom, "Failed to logout");
  }
});

// **For Testing:  Utility function to check authentication status
export const checkAuthStatus = async () => {
  const token = localStorage.getItem("auth_token");
  if (!token) return false;

  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return !!payload;
  } catch {
    return false;
  }
};
