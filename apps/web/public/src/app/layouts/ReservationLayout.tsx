import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function ReservationLayout() {
  return (
    <div className="flex flex-1 w-full">
      <NavBar />
      <div className='flex flex-col w-full mt-16 p-12 gap-10'>
        <Outlet />
      </div>
    </div>
  );
}
