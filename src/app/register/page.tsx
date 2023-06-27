"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { isEmailValid } from "../sign-in/page";
import { AuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

const isValid = (
  username: string,
  email: string,
  password: string
): boolean => {
  return isEmailValid(email) && !!password && !!username;
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const context = useContext(AuthContext);

  const onChange = (e: any) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onSubmit = () => {
    fetch("https://api.realworld.io/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        user: {
          email,
          password,
          username,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        context?.setUser(data.user);
      });
  };

  useEffect(() => {
    if (context?.isAuthenticated) {
      redirect("/");
    }
  }, [context?.isAuthenticated]);
  return (
    <div className="flex flex-col items-center gap-4">
      Register
      <Link href={"/sign-in"}>Already have an account? Click here</Link>
      <input
        type="text"
        name="username"
        onChange={onChange}
        placeholder="UserName"
      />
      <input type="text" name="email" onChange={onChange} placeholder="Email" />
      <input
        type="password"
        name="password"
        onChange={onChange}
        placeholder="Password"
      />
      <button
        className="disabled:opacity-50"
        disabled={!isValid(username, email, password)}
        onClick={onSubmit}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
