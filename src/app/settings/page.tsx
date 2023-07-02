"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const isValid = (): boolean => {
  //todo : complete here
  return true;
};
const Settings = () => {
  const context = useContext(AuthContext);
  const router = useRouter();
  console.log(context?.user);
  const [image, setImage] = useState(context?.user?.image);
  const [username, setUsername] = useState(context?.user?.username);
  const [bio, setBio] = useState(context?.user?.bio);
  const [email, setEmail] = useState(context?.user?.email);
  const [password, setPassword] = useState("");

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

  const onSubmit = () => {
    fetch("https://api.realworld.io/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",

        Authorization: "Token " + context?.user?.token,
      },
      body: JSON.stringify({
        user: {
          bio,
          email,
          image,
          password,
          username,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.user?.username) {
          router.push(`/`);
        }
      });
  };

  const onLogout = () => {
    context?.setUser(null);
  };

  useEffect(() => {
    if (!context?.isAuthenticated) {
      router.push("/sign-in");
    }
  }, [context?.isAuthenticated]);

  return (
    <div className="flex flex-col gap-4">
      <h1>Settings</h1>

      <input
        onChange={onChange}
        type="text"
        name="image"
        value={image}
        placeholder="image"
      />
      <input
        onChange={onChange}
        type="text"
        name="username"
        value={username}
        placeholder="Username"
      />
      <input
        onChange={onChange}
        type="text"
        name="bio"
        value={bio}
        placeholder="A short bio"
      />
      <input
        onChange={onChange}
        type="email"
        name="email"
        value={email}
        placeholder="Email"
      />
      <input
        onChange={onChange}
        type="password"
        name="password"
        value={password}
        placeholder="New Password"
      />

      <button onClick={onSubmit} disabled={!isValid()}>
        update info
      </button>
    </div>
  );
};

export default Settings;
