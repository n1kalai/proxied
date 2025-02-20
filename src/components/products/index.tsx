"use client"

import { GET_PRODUCTS_QUERY } from "@/services/queries/get-products-query"
import { useQuery } from "@apollo/client"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { GetProductsType } from "@/types/product-type"

const sectionClassname = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full"

export const ProductsContainer = () => {
    const {data} = useQuery<GetProductsType>(GET_PRODUCTS_QUERY)

    return <section className='flex flex-col items-start justify-start gap-2 xl:gap-4'>
        <h2 className="font-bold text-xl">Products</h2>
                <section className={sectionClassname}>
            {data?.getProducts?.products?.map((product) => (
                <Card key={product._id}>
                    <CardHeader>
                        <CardTitle>{product.title}</CardTitle>
                        <CardDescription>{product.cost}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
            </section>
        </section>
}