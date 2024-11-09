import React, { ReactElement } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ce-lab-mgmt/shared-ui';
import { getPathName, PathKeyType } from '../../assets/helper/pathName';

export function Breadcrumbs({ routes = [] }: { routes: string[] }) {
  let fullHref: string | undefined = undefined;
  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement | null = null;

  for (let i = 0; i < routes.length; i++) {
    console.log(routes);
    const route = routes[i];
    const href: string = fullHref
      ? `${fullHref}/${getPathName(route as PathKeyType)}`
      : `/${getPathName(route as PathKeyType)}`;
    fullHref = href;

    if (i === routes.length - 1) {
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage>{route}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbItems.push(
        <React.Fragment key={href}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={href} className="text-slate-600">
              {route}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>
      );
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-slate-600">
            หน้าแรก
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems}
        <BreadcrumbSeparator className="text-slate-600" />
        {breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
