import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import './languages/index';
import { AuthProvider } from './hooks/useAuth';
import { auth, db } from './firebase';
export function App() {
  return (
    <AuthProvider auth={auth} db={db}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
