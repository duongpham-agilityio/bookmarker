import { Outlet, RouteObject } from 'react-router-dom';

// Pages
import { Home, Detail } from 'pages';
import { Header } from 'layouts';

export const publicRoutes: RouteObject[] = [
  {
    path: '/books',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
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
