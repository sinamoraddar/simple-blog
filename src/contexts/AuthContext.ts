import { createContext } from "react";
import { UserShape } from "./AuthProvider";

// todo: get rid of anys in the codebase
export const AuthContext = createContext<{
  user: UserShape | null;
  setUser: any;
  isAuthenticated: boolean;
  onLogout: any;
} | null>(null);
