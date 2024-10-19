import React from 'react';
import { useAuth } from '@hooks/useAuth';

const SignInPage: React.FC = () => {
  const { user, signIn, signOut } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {user ? 'Welcome!' : 'Sign in to your account'}
        </h1>
        {user ? (
          <div className="text-center">
            <p className="mb-4">You are signed in as: {user.displayName}</p>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="w-full px-4 py-2 tracking-wide text-gray-700 transition-colors duration-200 transform bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:border-blue-500 flex items-center justify-center"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default SignInPage;