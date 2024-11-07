import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function GlobalLayout() {
  return (
    <div className="flex flex-col justify-start items-start w-screen">
      <NavBar />
      <Outlet />
    </div>
  );
}
