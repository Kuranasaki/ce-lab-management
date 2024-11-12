// import { BreadcrumbGenerator } from '@ce-lab-mgmt/shared-ui';
// import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

export default function BreadcrumbLayout() {
  // const location = useLocation();
  // // const { t } = useTranslation('translation', { keyPrefix: 'paths' });
  // // const pathSegments = location.pathname.slice(1).split('/');

  return (
    <div className="flex flex-col pt-28 p-12 gap-10 w-full">
      {/* TO BE FIX */}
      {/* <BreadcrumbGenerator
        paths={[
          {
            title: t('homepage'),
            path: '/',
          },
          ...pathSegments.map((path, index) => {
            const fullPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const translationKey = pathToTransKey.get(fullPath);

            return {
              title: translationKey ? t(translationKey) : path,
              path: fullPath,
            };
          }),
        ]}
      /> */}
      <div>Breadcrumb To Be Implemented</div>
      <Outlet />
    </div>
  );
}
