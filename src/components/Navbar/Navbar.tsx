"use client";

import { AuthContext } from "@/app/contexts/AuthContext";
import Link from "next/link";
import React, { useContext, useState } from "react";

const Navbar = () => {
  const context = useContext(AuthContext);

  return (
    <nav className="navbar bg-base-200 px-8 justify-between flex flex-wrap gap-4 ">
      <Link className="btn btn-active normal-case text-xl" href={"/"}>
        Home
      </Link>
      <div className="flex gap-2 flex-wrap   ">
        {context?.isAuthenticated ? (
          <>
            <Link className="btn btn-info normal-case text-xl" href={"/editor"}>
              New Article
            </Link>
            <Link
              className="btn btn-success normal-case text-xl"
              href={"/settings"}
            >
              Settings
            </Link>
            {/* todo: complete the dynamic route */}
            <button
              className="btn btn-warning normal-case text-xl"
              onClick={context.onLogout}
            >
              Log out
            </button>
            <span className="text-xl btn cursor-default ">
              {context.user?.username}
            </span>
          </>
        ) : (
          <>
            <Link
              className="btn btn-info normal-case text-xl"
              href={"/sign-in"}
            >
              Sign In
            </Link>
            <Link
              className="btn btn-success normal-case text-xl"
              href={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
