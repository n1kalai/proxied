"use client"

import { createContext, SetStateAction, useState, Dispatch } from "react";

type UserType = {
    isLoading: boolean;
    data: string | null;
  }


type UserContextType = {
    user : UserType,
    setUser: Dispatch<SetStateAction<UserType>>
}

export const UserContext = createContext<UserContextType>({
    user: {isLoading: true, data: null},
    setUser: () => {},
})

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<UserType>({isLoading: true, data: null})

    return (
        <UserContext.Provider value={{ user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

