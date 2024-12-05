import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useAtom } from "jotai";
import { accountsAtom, isAuthenticatedAtom, logoutAtom } from "@/store/auth";

export default function NavBar() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, logout] = useAtom(logoutAtom);
  const navigate = useNavigate();

  const LoginButton = () => {
    if (!isAuthenticated) {
      return (
        <Button
          onClick={() =>
            navigate({
              to: "/login",
            })
          }
        >
          Login
        </Button>
      );
    }
    return (
      <Button
        onClick={() => {
          logout();
          navigate({
            to: "/",
          });
        }}
      >
        Sign Out
      </Button>
    );
  };

  return (
    <nav className="flex justify-between items-center my-8 gap-12 mx-11 ">
      <Link to="/" className="text-lg font-bold">
        Home
      </Link>

      <ul className="flex items-center list-none gap-3">
        <li>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </li>
        <li>
          <LoginButton />
        </li>
      </ul>
    </nav>
  );
}
