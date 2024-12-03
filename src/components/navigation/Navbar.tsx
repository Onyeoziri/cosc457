import { Link } from "@tanstack/react-router";
import React from "react";
import { Button } from "../ui/button";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center my-8 gap-12">
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
          <Link
            to="/login"
            className=" rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 "
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
