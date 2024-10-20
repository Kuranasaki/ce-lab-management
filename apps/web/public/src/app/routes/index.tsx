import { createBrowserRouter } from 'react-router-dom';
import RequestReservationPage from '../views/request_reservation/RequestReservationPage';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../views/homepage/Homepage';
import ViewReservationPage from '../views/view_reservation/ViewReservationPage';
import ReservationDetailPage from '../views/detail_reservation/ReservationDetailPage';
import ExampleConfirmPage from '../views/request_reservation/ExampleConfirmPage';
import ExampleEditableTable from '../views/request_reservation/ExampleEditableTable';

export default createBrowserRouter([
  {
    path: '/',
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
            element: <MainLayout title='คำขอรับบริการทดสอบ' />,
            children: [
              {
                path: '',
                element: <ViewReservationPage />,
              },
            ],
          },
          {
            path: ':id',
            element: <MainLayout title='รายละเอียดคำขอรับบริการทดสอบ' />,
            children: [
              {
                path: '',
                element: <ReservationDetailPage />,
              },
            ],
          },
          {
            path: 'test1',
            element: <MainLayout title='ExampleEditableTable' />,
            children: [
              {
                path: '',
                element: <ExampleEditableTable />,
              },
            ],
          },
          {
            path: 'test2',
            element: <MainLayout title='ExampleConfirmPage' />,
            children: [
              {
                path: '',
                element: <ExampleConfirmPage />,
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
]);
