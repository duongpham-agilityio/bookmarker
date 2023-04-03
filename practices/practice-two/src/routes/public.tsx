import { RouteObject } from 'react-router-dom';

// Layouts
import { MainLayout } from 'layouts';

// Pages
import { Home, Detail } from 'pages';

export const publicRoutes: RouteObject[] = [
  {
    path: '/books',
    element: <MainLayout />,
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
