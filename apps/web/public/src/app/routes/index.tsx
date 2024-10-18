import { createBrowserRouter } from 'react-router-dom';
import ExamplePage from '../views/example_feature/ExamplePage';
import ExampleLayout from '../layouts/ExampleLayout';
import ReservationLayout from '../layouts/ReservationLayout';
import RequestReservationPage from '../views/request_reservation/RequestReservationPage';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../views/homepage/Homepage';

export default createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
  {
    path: 'reservation/',
    element: <ReservationLayout />,
    children: [
      {
        path: '',
        element: <div>Home</div>, // Replace with acutal reservation list page
      },
      {
        path: 'request',
        element: <RequestReservationPage />,
      },
    ],
  },
]);
