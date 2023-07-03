"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { saveToken } from "@/lib/authUtils";
import Loading from "@/components/Loading";
import { isEmailValid } from "@/lib/utils";

const isValid = (email: string, password: string): boolean => {
  return isEmailValid(email) && !!password;
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onChange = (e: any) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onSubmit = () => {
    setLoading(true);
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
        if (data.errors) {
          setError("Your Credentials Are Incorrect, Please check them again");
          setTimeout(() => {
            setError("");
          }, 1000);
        } else {
          context?.setUser(data.user);
          saveToken(data.user);
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
      <h1 className="text-lg">Sign In</h1>
      <p>
        {`Don't have an account?`}
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
        disabled={loading || !isValid(email, password)}
        onClick={onSubmit}
      >
        {loading && <Loading />}
        Submit
      </button>
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

export default SignIn;
