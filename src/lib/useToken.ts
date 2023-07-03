'use client'

import {UserShape} from "@/contexts/AuthProvider";

const TOKEN = "token";

export const useToken=()=>{



      const saveToken = (value: string) => {
        value && localStorage.setItem(TOKEN, JSON.stringify(value));
    };
      const getToken = (): UserShape | null => {
        const token = localStorage.getItem(TOKEN);
        return token ? JSON.parse(token) : null;
    };
      const removeToken = () => {
        localStorage.removeItem(TOKEN);
    };




    return {saveToken,getToken,removeToken}
}
