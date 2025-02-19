
"use client"

import { ApolloClient, createHttpLink,InMemoryCache,  } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const HTTP_URL ="https://take-home-be.onrender.com/api"

const httpLink = createHttpLink({
  uri: HTTP_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = typeof window !== "undefined" ? localStorage.getItem("visitorToken") : null;


  console.log("ttt",token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
   
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    // ssrMode: true
  });

// export const ApolloClientWrapper = ({children}: {children: React.ReactNode}) =>