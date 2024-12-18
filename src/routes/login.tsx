import { FormEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useAtom } from "jotai";
import { loginAtom, loadingAtom, errorAtom } from "@/store/auth";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [, login] = useAtom(loginAtom);
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Attempting login...");

    try {
      const user = await login(credentials);
      console.log("Login successful:", user);

      if (user && user.id) {
        navigate({
          to: "/$id",
          params: { id: user.id.toString() },
          replace: true,
        });
      } else {
        console.error("Invalid user data received");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-max flex items-center justify-center text px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 bg-white shadow-xl rounded-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-extrabold text-slate-900">Sign In</CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit} method="Get">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500
                disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                placeholder="you@example.com"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500
                  disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
              >
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <a
            href="/id"
            className="font-medium text-slate-600 hover:text-slate-500 transition-colors duration-200"
          >
            Forgot your password?
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
