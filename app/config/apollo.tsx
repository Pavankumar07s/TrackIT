import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloProviderClient,
} from '@apollo/client'
import React, { ReactNode } from 'react'

export interface IApolloProviderProps {
  children: ReactNode
}

export const CustomApolloProvider = ({ children }: IApolloProviderProps) => {
  const apolloClient = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
  })

  return <ApolloProviderClient client={apolloClient}>{children}</ApolloProviderClient>
}
