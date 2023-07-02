"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { saveToken } from "@/lib/authUtils";

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
        saveToken(data.user);
      });
  };

  useEffect(() => {
    if (context?.isAuthenticated) {
      redirect("/");
    }
  }, [context?.isAuthenticated]);
  return (
    <div className="card w-96 bg-base-100 shadow-xl flex flex-col items-center gap-4 p-4 mt-8 mx-auto">
      <h1 className="text-lg">Sign In</h1>
      <p>
        Don't have an account?
        <Link href={"/register"} className="link link-accent ml-2">
          Click here
        </Link>
      </p>
      <div className="flex flex-col gap-4 w-full">
        <div className="form-control ">
          <label className="input-group input-group-vertical">
            <span>Email</span>

            <input
              onChange={onChange}
              type="text"
              placeholder="info@site.com"
              className="input input-bordered w-full"
              value={email}
              name="email"
            />
          </label>
        </div>
        <div className="form-control  ">
          <label className="input-group input-group-vertical">
            <span>Password</span>

            <input
              onChange={onChange}
              type="password"
              className="input input-bordered w-full"
              value={password}
              name="password"
            />
          </label>
        </div>
      </div>
      <button
        className="btn btn-success"
        disabled={!isValid(email, password)}
        onClick={onSubmit}
      >
        submit
      </button>
    </div>
  );
};

export default SignIn;
