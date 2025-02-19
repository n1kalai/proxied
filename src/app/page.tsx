import { GET_PRODUCTS_QUERY} from "@/services/get-data";
import { client } from "./lib/apollo-client";

export default async function Home() {

const data =  client.query({query: GET_PRODUCTS_QUERY})


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        project initialization
        </main>
    </div>
  );
}
