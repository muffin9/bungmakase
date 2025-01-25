'use client';

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 2, // 2분
            gcTime: 1000 * 60 * 5, // 5분
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            // 전역 에러 핸들링

            // 개발 환경에서만 콘솔에 상세 정보 출력
            if (process.env.NODE_ENV === 'development') {
              console.error(
                `[Query Error] ${query.queryKey}: ${
                  error instanceof Error ? error.message : 'Unknown error'
                }`,
              );
            }
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
