import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

// Layouts
import { MainLayout } from 'layouts';

// Constants
import { ENDPOINT } from '@constants';

// Pages
const Home = lazy(() => import('pages/Home'));
const Detail = lazy(() => import('pages/Detail'));

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ENDPOINT.BOOKS,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: ':id',
            element: <Detail />,
          },
        ],
      },
    ],
  },
];
