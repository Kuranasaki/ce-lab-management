import { createBrowserRouter } from 'react-router-dom';
import GlobalLayout from '../layouts/GlobalLayout';
import HomePage from '../views/homepage/HomePage';
import BreadcrumbLayout from '../layouts/BreadcrumbLayout';
import ViewAllTestFormPage from '../views/viewAllTestForm/ViewAllTestFormPage';
import AddTestFormPage from '../views/addTestForm/AddTestFormPage';

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
            pathToTransKey={
              new Map([
                ['/', 'homepage'],
                ['/testForms', 'testForm'],
                ['/testForms/add', 'addTestForm'],
                ['/reservation', 'reservation'],
                ['/wage', 'wage'],
              ])
            }
          />
        ),
        children: [
          {
            path: 'testForms',
            element: <ViewAllTestFormPage />,
          },
          {
            path: 'testForms/add',
            element: <AddTestFormPage />,
          },
        ],
      },
    ],
  },
]);
