'use client';

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const HTTP_URL = 'https://take-home-be.onrender.com/api';
const WS_URL = 'wss://take-home-be.onrender.com/api';

const httpLink = createHttpLink({
  uri: HTTP_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('visitorToken') : null;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: WS_URL,
          onNonLazyError: (error) => {
            console.log('onNonLazyError', error);
          },
          connectionParams: {
            authToken: localStorage.getItem('visitorToken')
              ? `${localStorage.getItem('visitorToken')}`
              : '',
          },
        }),
      )
    : null; // Avoid WebSockets on the server side

//  Use WebSocket for Subscriptions, HTTP for Queries/Mutations
const splitLink =
  typeof window !== 'undefined' && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        authLink.concat(httpLink), // Default to HTTP
      )
    : authLink.concat(httpLink); // Fallback to HTTP if WebSockets are unavailable

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Cart: {
        fields: {
          items: {
            merge(_existing = [], incoming) {
              return incoming; // Replace the existing items array with the new one
            },
          },
        },
      },
    },
  }),
});

// export const ApolloClientWrapper = ({children}: {children: React.ReactNode}) =>
