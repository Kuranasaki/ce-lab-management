import { createBrowserRouter } from 'react-router-dom';
import GlobalLayout from '../layouts/GlobalLayout';
import HomePage from '../views/homepage/HomePage';
import BreadcrumbLayout from '../layouts/BreadcrumbLayout';
import ViewAllTestFormPage from '../views/test-form/ViewAllTestFormPage';

export default createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: '/',
        element: (
          <BreadcrumbLayout
            staticPaths={[
              'testForms',
              'wages',
              'reservations',
              'create',
              'edit',
            ]}
          />
        ),
        children: [
          {
            path: 'testForms',
            element: <ViewAllTestFormPage />,
          },
        ],
      },
    ],
  },
]);
