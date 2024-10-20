import { createBrowserRouter } from 'react-router-dom';
import RequestReservationPage from '../views/request_reservation/RequestReservationPage';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../views/homepage/Homepage';
import ViewReservationPage from '../views/view_reservation/ViewReservationPage';
import ReservationDetailPage from '../views/view_reservation_detail/ReservationDetailPage';
import GlobalLayout from '../layouts/GlobalLayout';

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
