import { Outlet } from 'react-router-dom';

export default function GlobalLayout() {
  return (
    <div className="flex flex-col justify-start items-start w-screen">
      <nav> To be Implemented </nav>
      <div className="p-12">
        <Outlet />
      </div>
    </div>
  );
}
