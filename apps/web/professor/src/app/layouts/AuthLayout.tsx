import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className="flex w-full items-center justify-center min-h-screen bg-gray-100">
            <Outlet />
        </div>
    );
}
