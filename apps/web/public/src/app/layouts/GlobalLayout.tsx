import { Toaster } from '@ce-lab-mgmt/shared-ui';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function GlobalLayout() {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
}
