import { BreadcrumbGenerator } from '@ce-lab-mgmt/shared-ui';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

export default function BreadcrumbLayout({
  staticPaths,
}: {
  staticPaths: string[];
}) {
  const location = useLocation();
  const { t } = useTranslation('translation', { keyPrefix: 'paths' });
  const pathSegments = location.pathname.slice(1).split('/');

  return (
    <div className="flex flex-col pt-28 p-12 gap-10">
      <BreadcrumbGenerator
        paths={[
          {
            title: t('home'),
            path: '/',
          },
          ...pathSegments.map((path, index) => {
            const fullPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
            return {
              title: staticPaths.includes(path) ? t(path) : path,
              path: fullPath,
            };
          }),
        ]}
      />
      <Outlet />
    </div>
  );
}
