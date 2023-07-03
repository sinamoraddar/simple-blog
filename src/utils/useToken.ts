"use client";

import { UserShape } from "@/contexts/AuthProvider";

const TOKEN = "token";

export const useToken = () => {
  const saveToken = (value: string) => {
    if (typeof window !== "undefined") {
      value && localStorage.setItem(TOKEN, JSON.stringify(value));
    }
  };
  const getToken = (): UserShape | null => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(TOKEN);
      return token ? JSON.parse(token) : null;
    }
    return null;
  };
  const removeToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN);
    }
  };

  return { saveToken, getToken, removeToken };
};
