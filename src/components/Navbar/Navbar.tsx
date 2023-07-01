"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import React, { useContext, useState } from "react";

const Navbar = () => {
  const context = useContext(AuthContext);

  return (
    <nav className="p-4 justify-between flex ">
      <Link href={"/"}>Home</Link>
      <div className="flex gap-2">
        {context?.isAuthenticated ? (
          <>
            <Link href={"/editor"}>New Article</Link>
            <Link href={"/settings"}>Settings</Link>
            {/* todo: complete the dynamic route */}
            <Link href={"/profile/{username}"}>Profile</Link>
            <button onClick={context.onLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link href={"/sign-in"}>Sign In</Link>
            <Link href={"/register"}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
