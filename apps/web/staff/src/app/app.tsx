import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import './languages/index';
export function App() {
  return <RouterProvider router={router} />;
}

export default App;