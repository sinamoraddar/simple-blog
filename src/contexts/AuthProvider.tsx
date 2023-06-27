"use client";

import { useState } from "react";
import { AuthContext } from "./AuthContext";

interface User {
  email: string;
  username: string;
  bio: string | null;
  image: string;
  token: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
