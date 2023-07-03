import { createContext } from "react";
import { User } from "./AuthProvider";

// todo: get rid of anys in the codebase
export const AuthContext = createContext<{
  user: User | null;
  setUser: any;
  isAuthenticated: boolean;
  onLogout: any;
} | null>(null);
