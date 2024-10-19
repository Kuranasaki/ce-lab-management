import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function ReservationLayout() {
  return (
    <div className="flex flex-col w-full">
      <NavBar />
      <Outlet />
    </div>
  );
}
