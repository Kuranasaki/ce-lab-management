import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export default function ProtectedLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Function that returns a promise which waits for `loading` to finish
  const waitForAuth = () =>
    new Promise<void>((resolve) => {
      const checkAuth = () => {
        if (!loading) {
          resolve();
        } else {
          setTimeout(checkAuth, 100); // Retry after 100ms if loading is still true
        }
      };
      checkAuth();
    });

  useEffect(() => {
    // Wait for loading to complete and then check the user
    waitForAuth().then(() => {
      if (!user) {
        navigate('/auth/signin');
      }
    });
  }, [user, navigate]);

  return <Outlet />;
}
