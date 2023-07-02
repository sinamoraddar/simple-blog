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
    <div className="card w-96 bg-base-100 shadow-xl flex flex-col items-center gap-4 p-4 mt-8 mx-auto">
      <h1 className="text-lg">Register</h1>
      <p>
        Already have an account?
        <Link href={"/sign-in"} className="link link-accent ml-2">
          Click here
        </Link>
      </p>

      <div className="flex flex-col gap-4 w-full">
        <div className="form-control ">
          <label className="input-group input-group-vertical">
            <span>Username</span>

            <input
              className="input input-bordered w-full"
              type="text"
              name="username"
              onChange={onChange}
              value={username}
            />
          </label>
        </div>
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
        className="btn btn-primary"
        disabled={!isValid(username, email, password)}
        onClick={onSubmit}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
