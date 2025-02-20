"use client"

import { UserContext } from "@/context/user-context";
import { use, useEffect } from "react";



export const useUser = () => {
    const { user, setUser} = use(UserContext)

    useEffect(() => {
      const storedToken = localStorage.getItem("visitorToken");
    
      if(storedToken) {
        setUser({isLoading: false, data: storedToken});
      } else {
        setUser({isLoading: false, data: null});
      }
    }, [setUser]);

    return { user, setUser };
}