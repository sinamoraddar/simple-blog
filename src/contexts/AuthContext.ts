import { createContext } from "react";

// todo: get rid of anys in the codebase
export const AuthContext = createContext<{
  user: any;
  setUser: any;
  isAuthenticated: boolean;
} | null>(null);
