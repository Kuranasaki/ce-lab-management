import { createBrowserRouter } from 'react-router-dom';
import RequestReservationPage from '../views/request_reservation/RequestReservationPage';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../views/homepage/Homepage';
import ViewReservationPage from '../views/view_reservation/ViewReservationPage';
import ReservationDetailPage from '../views/detail_reservation/ReservationDetailPage';
import EditableTableExample from '../views/detail_reservation/EditableTableExample';
import ConfirmTableExample from '../views/detail_reservation/ConfirmTableExample';
import SignInPage from '../views/auth_signin/SignInPage';

export default createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'auth/',
        children: [
          {
            path: 'signin',
            element: <MainLayout title="Sign In" />,
            children: [
              {
                path: '',
                element: <SignInPage />,
              },
            ],
          },
        ],
      },
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
            path: 'test1',
            element: <MainLayout title="EditableTableExample" />,
            children: [
              {
                path: '',
                element: <EditableTableExample />,
              },
            ],
          },
          {
            path: 'test2',
            element: <MainLayout title="ConfirmTableExample" />,
            children: [
              {
                path: '',
                element: <ConfirmTableExample />,
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
      {
        path: 'pricing/',
        element: <MainLayout title="ราคาทดสอบ" />,
        children: [
          {
            path: '',
            element: <div>PRICING PAGE</div>,
          },
        ],
      },
    ],
  },
]);
