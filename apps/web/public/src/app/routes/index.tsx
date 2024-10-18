import { createBrowserRouter } from 'react-router-dom';
import ExamplePage from '../views/example_feature/ExamplePage';
import ExampleLayout from '../layouts/ExampleLayout';
import ReservationLayout from '../layouts/ReservationLayout';
import RequestReservationPage from '../views/request_reservation/RequestReservationPage';

export default createBrowserRouter([
  {
    path: '/',
    element: <ExampleLayout />, // Replace with actual layout (Transperant Navbar)
    children: [
      {
        path: '',
        element: <ExamplePage />, // Replace with actual home page
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
