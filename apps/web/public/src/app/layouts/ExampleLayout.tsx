import { Outlet } from 'react-router-dom';
import GlobalComponent from '../components/GlobalComponent';

export default function ExampleLayout() {
  return (
    <div>
      <GlobalComponent />
      <Outlet />
    </div>
  );
}
