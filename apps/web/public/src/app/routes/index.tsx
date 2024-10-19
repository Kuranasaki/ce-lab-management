import { createBrowserRouter } from 'react-router-dom';
import RequestReservationPage from '../views/request_reservation/RequestReservationPage';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../views/homepage/Homepage';

export default createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: '', // Main layout routes
        children: [
          {
            path: 'reservation/',
            children: [
              {
                path: '',
                element: <MainLayout title='คำขอรับบริการทดสอบ' />,
                children: [
                  {
                    path: '',
                    element: <div>RESERVATION PAGE</div>,
                  },
                ],
              },
              {
                path: 'request',
                element: <MainLayout title='สร้างคำขอรับบริการทดสอบ' />,
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
            element: <MainLayout title='ราคาทดสอบ' />,
            children: [
              {
                path: '',
                element: <div>PRICING PAGE</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);
