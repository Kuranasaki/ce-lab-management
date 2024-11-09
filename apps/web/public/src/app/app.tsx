import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import './languages/index';
import { AuthProvider } from './hooks/useAuth';
import { auth } from './firebase';
export function App() {
  return (
    <AuthProvider auth={auth}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
