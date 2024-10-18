import { Outlet } from 'react-router-dom';

export default function ReservationLayout() {
  return (
    <div className="flex flex-col w-full">
      <div className="h-16 w-full flex justify-center items-center bg-primary-500 text-slate-50">
        TO BE NAVBAR, REPLACE THIS DIV WITH ACTUAL NAVBAR
      </div>
      <Outlet />
    </div>
  );
}
