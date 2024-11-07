import { createBrowserRouter } from 'react-router-dom';
import GlobalLayout from '../layouts/GlobalLayout';
import HomePage from '../views/homepage/HomePage';

export default createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
]);
