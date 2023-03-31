import { Outlet, RouteObject } from 'react-router-dom';

// Pages
import { Home, Detail } from 'pages';

export const publicRoutes: RouteObject[] = [
  {
    path: '/books',
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
];
