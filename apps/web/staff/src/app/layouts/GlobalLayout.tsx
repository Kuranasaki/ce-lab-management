import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Toaster } from '@ce-lab-mgmt/shared-ui';

export default function GlobalLayout() {
  return (
    <div className="flex flex-col justify-start items-start w-full">
      <NavBar />
      <Outlet />
      <Toaster />
    </div>
  );
}
