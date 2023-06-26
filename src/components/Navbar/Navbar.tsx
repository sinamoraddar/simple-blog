"use client";

import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <nav className="p-4 justify-between flex ">
      <Link href={"/"}>Home</Link>
      <div className="flex gap-2">
        {isLoggedIn ? (
          <>
            <Link href={"/editor"}>New Article</Link>
            <Link href={"/settings"}>Settings</Link>
            {/* todo: complete the dynamic route */}
            <Link href={"/profile/{username}"}>Profile</Link>
            <button>Log out</button>
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
