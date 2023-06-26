"use client";

import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e: any) => {
    console.log(e.target.value);

    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onSubmit = () => {
    fetch("https://api.realworld.io/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        user: { email: "sinamoraddar@gmail.com", password: "65CgGSK96fL8FPW" },
      }),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  return (
    <div>
      SignIn
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
      <button onClick={onSubmit}>submit</button>
    </div>
  );
};

export default SignIn;
