import { User } from "@/contexts/AuthProvider";

const TOKEN = "token";

export const saveToken = (value: string) => {
  localStorage.setItem(TOKEN, JSON.stringify(value));
};
export const getToken = (): User | null => {
  const token = localStorage.getItem(TOKEN);
  return token ? JSON.parse(token) : null;
};
export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};
