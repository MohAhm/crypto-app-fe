import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import React from 'react';
import AppTest from './app/components/AppTest';

// Initialize ApolloClient
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/',
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppTest />
    </ApolloProvider>
  );
}

