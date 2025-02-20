import AuthenticatePage from "@/components/authenticate-page";
import { ProductsContainer } from "@/components/products";
import { Suspense } from "react";

export default async function Home() {

  return (
    <div className="flex items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Suspense fallback={<span />}>
        <AuthenticatePage>
            <ProductsContainer />
        </AuthenticatePage>
        </Suspense>
    </div>
  );
}
