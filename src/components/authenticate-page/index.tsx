"use client"

import { useUser } from "@/hooks/use-user"
import { LoadingSpinner } from "../loader"
import { ReactNode } from "react"
import { NotLoggedInScreen } from "./not-logged-in"

export default function AuthenticatePage({children: children}: {children: ReactNode}) {
    const {user} = useUser()

    if (user.isLoading) {
        return <LoadingSpinner />
    }
    
    if(!user.isLoading && !user.data) {
        return <NotLoggedInScreen />
    }

    return children
}