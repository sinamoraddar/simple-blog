"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

export const isEmailValid = (email: string): boolean => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isValid = (email: string, password: string): boolean => {
  return isEmailValid(email) && !!password;
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AuthContext);

  const onChange = (e: any) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onSubmit = () => {
    fetch("https://api.realworld.io/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        user: {
          email,
          password,
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
      SignIn
      <Link href={"/register"}>Don't have an account? Click here</Link>
      <input
        onChange={onChange}
        type="text"
        placeholder="Email"
        value={email}
        name="email"
      />
      <input
        onChange={onChange}
        type="password"
        placeholder="Password"
        value={password}
        name="password"
      />
      <button
        className="disabled:opacity-50"
        disabled={!isValid(email, password)}
        onClick={onSubmit}
      >
        submit
      </button>
    </div>
  );
};

export default SignIn;
