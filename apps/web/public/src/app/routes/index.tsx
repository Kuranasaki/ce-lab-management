import { createBrowserRouter } from 'react-router-dom';
import RequestReservationPage from '../views/request_reservation/RequestReservationPage';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../views/homepage/Homepage';
import ViewReservationPage from '../views/view_reservation/ViewReservationPage';
import PricingPage from '../views/pricing/PricingPage';
import ReservationDetailPage from '../views/view_reservation_detail/ReservationDetailPage';
import SignInPage from '../views/auth_signin/SignInPage';
import AuthLayout from '../layouts/AuthLayout';
import GlobalLayout from '../layouts/GlobalLayout';
import ProtectedLayout from '../layouts/ProtectedLayout';
import SignUpPage from '../views/auth_signin/SignUpPage';

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
        path: 'auth/',
        element: <AuthLayout />,
        children: [
          {
            path: 'signin/',
            element: <SignInPage />,
          },
          {
            path: 'signup/',
            element: <SignUpPage />,
          },
        ],
      },
      {
        path: '',
        element: <ProtectedLayout />,
        children: [
          {
            path: 'reservation/',
            children: [
              {
                path: '',
                element: <MainLayout title="คำขอรับบริการทดสอบ" />,
                children: [
                  {
                    path: '',
                    element: <ViewReservationPage />,
                  },
                ],
              },
              {
                path: ':id',
                element: <MainLayout title="รายละเอียดคำขอรับบริการทดสอบ" />,
                children: [
                  {
                    path: '',
                    element: <ReservationDetailPage />,
                  },
                ],
              },
              {
                path: 'request',
                element: <MainLayout title="สร้างคำขอรับบริการทดสอบ" />,
                children: [
                  {
                    path: '',
                    element: <RequestReservationPage />,
                  },
                ],
              },
            ],
          },
        ]
      },
      {
        path: 'pricing/',
        element: <MainLayout title="ราคาทดสอบ" />,
        children: [
          {
            path: '',
            element: <PricingPage />,
          },
        ],
      },
    ],
  },
]);

