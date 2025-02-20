"use client"

import Link from "next/link"
import { CartIcon } from "../icons/cart-svg"
import { Button } from "../ui/button"
import { useUser } from "@/hooks/use-user"

export const CartBtn = () => {
    const {user} = useUser()
    
    return (user.data && <Button variant="outline" size="icon" asChild>
                <Link href="/cart">
                    <CartIcon />
                </Link>
        </Button>)
}