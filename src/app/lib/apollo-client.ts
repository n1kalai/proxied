import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
   
    link: new HttpLink({
      uri: "https://take-home-be.onrender.com/api",
      fetchOptions: { cache: "no-store" }, 
    }),
    cache: new InMemoryCache(),
  });