"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { redirect } from "next/navigation";
import Loading from "@/components/Loading";
import { isEmailValid } from "@/lib/utils";
import { createUser } from "@/api/methods";

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
  const [loading, setLoading] = useState(false);
  const context = useContext(AuthContext);
  const [error, setError] = useState("");

  const onChange = (e: any) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onSubmit = (e: any) => {
    setLoading(true);
    createUser({ email, password, username })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setError(
            Object.entries(data.errors)
              .map((entry: [string, any]) => entry[0] + " " + entry[1][0])
              .join(", ")
          );
          setTimeout(() => {
            setError("");
          }, 1000);
        } else {
          context?.setUser(data.user);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (context?.isAuthenticated) {
      redirect("/");
    }
  }, [context?.isAuthenticated]);
  return (
    <form className="card w-96 bg-base-100 shadow-xl flex flex-col items-center gap-4 p-4 mt-8 mx-auto">
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
        disabled={loading || !isValid(username, email, password)}
        onClick={onSubmit}
      >
        {loading && <Loading />}
        Register
      </button>{" "}
      <div className="toast toast-top toast-center">
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
      </div>
    </form>
  );
};

export default Register;
