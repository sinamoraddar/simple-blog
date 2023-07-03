"use client";

import { useState } from "react";
import { AuthContext } from "./AuthContext";



const TOKEN = "token";

export const saveToken = (value: string) => {
  value && window.localStorage.setItem(TOKEN, JSON.stringify(value));
};
export const getToken = (): UserShape | null => {
  const token = window.localStorage.getItem(TOKEN);
  return token ? JSON.parse(token) : null;
};
export const removeToken = () => {
  window.localStorage.removeItem(TOKEN);
};


export interface UserShape {
  email: string;
  username: string;
  bio: string | null;
  image: string;
  token: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserShape | null>(getToken());
  const onLogout = () => {
    setUser(null);
    removeToken();
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated: !!user, onLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
