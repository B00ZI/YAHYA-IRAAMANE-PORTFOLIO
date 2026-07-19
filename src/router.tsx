import { createRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'

// 1. Create a global QueryClient instance for React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    },
  },
})

// 2. Instantiate your router with the required queryClient context
export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})

// 3. Register the router instance for automatic type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
