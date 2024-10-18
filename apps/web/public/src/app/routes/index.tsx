import { createBrowserRouter } from 'react-router-dom';
import ExamplePage from '../views/example_feature/ExamplePage';
import ExampleLayout from '../layouts/ExampleLayout';

export default createBrowserRouter([
  {
    path: '/',
    element: <ExampleLayout />,
    children: [
      {
        path: '',
        element: <ExamplePage />,
      },
    ],
  },
]);
