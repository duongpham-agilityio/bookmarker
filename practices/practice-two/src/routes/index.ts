import { createBrowserRouter } from 'react-router-dom';

// Public routes
import { publicRoutes } from './public';

export const routes = createBrowserRouter([...publicRoutes]);
