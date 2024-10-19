import { Outlet, useLoaderData } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function MainLayout({ title }: { title: string }) {

  return (
    <div className="flex flex-1 w-full">
      <NavBar />
      <div className='flex flex-col w-full mt-16 p-12 gap-10'>
        <div>BREADCRUMB</div>
        <div className='flex flex-col px-40 gap-8'>
          <h2 className='text-center'>{title}</h2>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
