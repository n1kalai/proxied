"use client"

import { useUser } from "@/hooks/use-user"

import { ReactNode } from "react"
import { NotLoggedInScreen } from "./not-logged-in"

export default function AuthenticatePage({children: children}: {children: ReactNode}) {
    const {user} = useUser()

    if (user.isLoading) {
        return null
    }
    
    if(!user.isLoading && !user.data) {
        return <NotLoggedInScreen />
    }

    return children
}