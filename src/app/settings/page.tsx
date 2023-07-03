"use client";

import { updateUser } from "@/api/methods";
import Loading from "@/components/Loading";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import {saveToken} from "@/contexts/AuthProvider";

const isValid = (): boolean => {
  //todo : complete here
  return true;
};
const Settings = () => {
  const context = useContext(AuthContext);
  const router = useRouter();
  const token = context?.user?.token;
  const [image, setImage] = useState(context?.user?.image);
  const [username, setUsername] = useState(context?.user?.username);
  const [bio, setBio] = useState<string>(context?.user?.bio ?? "");
  const [email, setEmail] = useState(context?.user?.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //todo get rid of anys everythere
  const onChange = (e: any) => {
    const { name, value } = e.target;
    // todo: custom hook

    switch (name) {
      case "image": {
        setImage(value);

        break;
      }
      case "username": {
        setUsername(value);

        break;
      }
      case "bio": {
        setBio(value);

        break;
      }
      case "email": {
        setEmail(value);

        break;
      }
      case "password": {
        setPassword(value);

        break;
      }
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    updateUser({ email, password, username, token, bio, image })
      .then((res) => res.json())
      .then((data) => {
        context?.setUser(data.user);
        saveToken(data.user);
        if (data?.user?.username) {
          router.push(`/`);
        }
      })
      .finally(() => setLoading(false));
  };


  useEffect(() => {
    if (!context?.isAuthenticated) {
      router.push("/sign-in");
    }
  }, [context?.isAuthenticated]);

  return (
    <>
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">Settings</h1>
          </div>
        </div>
      </div>
      <form className="flex flex-col mx-auto gap-4 max-w-md">
        <div className="flex flex-col gap-4 w-full w-full">
          <div className="form-control ">
            <label className="input-group input-group-vertical">
              <span>Image</span>

              <input
                onChange={onChange}
                type="text"
                className="input input-bordered w-full"
                value={image}
                placeholder="image"
                name="image"
              />
            </label>
          </div>
          <div className="form-control  ">
            <label className="input-group input-group-vertical">
              <span>Username</span>

              <input
                onChange={onChange}
                type="text"
                className="input input-bordered w-full"
                name="username"
                value={username}
                placeholder="Username"
              />
            </label>
          </div>

          <div className="form-control ">
            <label className="input-group input-group-vertical">
              <span>Bio</span>

              <input
                className="input input-bordered w-full"
                onChange={onChange}
                type="text"
                name="bio"
                value={bio}
                placeholder="A short bio"
              />
            </label>
          </div>
          <div className="form-control  ">
            <label className="input-group input-group-vertical">
              <span>Email</span>

              <input
                type="email"
                className="input input-bordered w-full"
                onChange={onChange}
                name="email"
                value={email}
                placeholder="Email"
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
                name="password"
                value={password}
                placeholder="New Password"
              />
            </label>
          </div>
        </div>
        <button
          className="btn btn-info"
          onClick={onSubmit}
          disabled={loading || !isValid()}
        >
          {loading && <Loading />}
          Update
        </button>{" "}

      </form>
    </>
  );
};

export default Settings;
