import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../views/homepage/Homepage';
import SignInPage from '../views/auth_signin/SignInPage';
import AuthLayout from '../layouts/AuthLayout';
import GlobalLayout from '../layouts/GlobalLayout';
import ProtectedLayout from '../layouts/ProtectedLayout';
import ViewExperimentsPage from '../views/view_experiments/ViewExperiment';
import ViewExperimentDetailPage from '../views/view_experiment_detail/ViewExperimentDetail';

export default createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        path: 'auth/',
        element: <AuthLayout />,
        children: [
          {
            path: 'signin/',
            element: <SignInPage />,
          },
        ],
      },
      {
        path: '',
        element: <ProtectedLayout />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: 'experiment/',
            children: [
              {
                path: '',
                element: <MainLayout title="รายการทดสอบ" />,
                children: [
                  {
                    path: '',
                    element: <ViewExperimentsPage />,
                  },
                ],
              },
              {
                path: ':id',
                element: <MainLayout title="รายละเอียดการทดสอบ" />,
                children: [
                  {
                    path: '',
                    element: <ViewExperimentDetailPage/>,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
