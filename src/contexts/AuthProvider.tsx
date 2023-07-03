"use client";

import { useState } from "react";
import { AuthContext } from "./AuthContext";
import {useToken} from "@/lib/useToken";







export interface UserShape {
  email: string;
  username: string;
  bio: string | null;
  image: string;
  token: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {removeToken,getToken}=useToken()
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
