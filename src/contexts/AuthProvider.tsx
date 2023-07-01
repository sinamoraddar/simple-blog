"use client";

import { useState } from "react";
import { AuthContext } from "./AuthContext";

export interface User {
  email: string;
  username: string;
  bio: string | null;
  image: string;
  token: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const onLogout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated: !!user, onLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
