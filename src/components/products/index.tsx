"use client"

import { GET_PRODUCTS_QUERY } from "@/services/queries/get-products-query"
import { useQuery } from "@apollo/client"

export const ProductsContainer = () => {
    const data = useQuery(GET_PRODUCTS_QUERY)

    console.log("Da",data)

    return <div>products</div>
}