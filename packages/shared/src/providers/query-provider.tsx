import React from "react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import {
  createMenuPersister,
  createPersistentQueryClient,
  menuPersistenceConfig,
} from "../lib/query-persistence";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a persistent client for menu caching
const queryClient = createPersistentQueryClient();
const menuPersister = createMenuPersister();

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: menuPersister,
        maxAge: menuPersistenceConfig.maxAge,
        buster: menuPersistenceConfig.buster,
      }}
      onSuccess={() => {
        // Optional: Resume any paused mutations after restore
        queryClient.resumePausedMutations();
      }}
    >
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </PersistQueryClientProvider>
  );
}
