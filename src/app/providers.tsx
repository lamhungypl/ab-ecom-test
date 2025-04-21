// In Next.js, this file would be called: app/providers.tsx
'use client';

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { toast } from '@/features/base/hooks/use-toast';

function makeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // throwOnError: true,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 5,
      },
    },
    queryCache: new QueryCache({
      onError: (_error, query) => {
        if (!query.meta?.disableToast) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'System Error!',
          });
        }
      },
    }),
    mutationCache: new MutationCache({
      onSuccess: (data, variable, _context, mutation) => {
        const enableToast = !mutation.meta?.disableToast && !mutation.meta?.disableToastSuccess;
        if (enableToast) {
          toast({
            title: 'Success',
            description: 'Success',
          });
        }
        const invalidates = mutation.meta?.invalidates;

        if (invalidates) {
          queryClient.invalidateQueries(invalidates({ data, variable }));
        }
      },

      onError: (_error, _variables, _context, mutation) => {
        if (!mutation.meta?.disableToast) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Error!',
          });
        }
      },
    }),
  });
  return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
