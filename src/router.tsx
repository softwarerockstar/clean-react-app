import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Root = React.lazy(() => import('./shared/components/layout/Root'));
const HomePage = React.lazy(() => import('./shared/components/layout/HomePage'));
const NotFoundPage = React.lazy(() => import('./shared/components/layout/NotFoundPage'));

const PostsListPage = React.lazy(() => import('./modules/posts/pages/PostListPage'));
const PostDetailPage = React.lazy(() => import('./modules/posts/pages/PostDetailPage'));

const withSuspense = (Component: React.ComponentType<any>) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Component />
  </React.Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(Root),
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
      {
        path: 'posts',
        element: withSuspense(PostsListPage),
      },
      {
        path: 'posts/:id',
        element: withSuspense(PostDetailPage),
      },
      {
        path: '*',
        element: withSuspense(NotFoundPage),
      },
    ],
  },
]);