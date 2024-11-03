import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { getPathName } from '../../assets/helper/pathName';
import { Breadcrumbs } from './Breadcrumbs';

export default function MainLayout({
  title = '',
  showTitle = true,
}: {
  title?: string;
  showTitle?: boolean;
}) {
  const location = useLocation();

  return (
    <div className="flex flex-1 w-full">
      <NavBar />

      <div className="flex flex-col w-full mt-16 p-12 gap-10">
        <Breadcrumbs
          routes={location.pathname
            .slice(1)
            .split('/')
            .map((r) =>
              getPathName(
                r as
                  | 'reservation'
                  | 'request'
                  | 'pricing'
                  | 'certificate'
                  | 'auth'
                  | 'signin'
                  | 'signup'
              )
            )}
        />

        <div className="flex flex-col lg:px-40 xl:px-64 px-0 gap-8">
          {showTitle && <h2 className="text-center">{title}</h2>}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
