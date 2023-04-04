import { Outlet, RouteObject } from 'react-router-dom';

// Layouts
import { MainLayout } from 'layouts';

// Pages
import { Home, Detail } from 'pages';

// Constants
import { ENDPOINT } from '@constants';

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
