/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Create a custom render function that includes providers
type CustomRenderOptions = {
  routerPath?: string;
  initialEntries?: string[];
  queryClient?: QueryClient;
} & Omit<RenderOptions, 'wrapper'>;

export function renderWithProviders(
  ui: ReactElement,
  {
    routerPath = '/',
    initialEntries = ['/'],
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          // Replace cacheTime with staleTime as per React Query v4
          staleTime: 0,
        },
      },
    }),
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path={routerPath} element={children} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };
  
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Export everything from testing-library for convenience
export * from '@testing-library/react';
export { renderWithProviders as render };