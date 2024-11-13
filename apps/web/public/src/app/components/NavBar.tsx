import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@ce-lab-mgmt/shared-ui';
import logo from '../../../src/assets/logo-civil-engineering.svg';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { useAuth } from '../hooks/useAuth';

export default function NavBar({ variant }: { variant?: string }) {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out', error);
        }
    };

    return (
        <div className={`fixed top-0 z-50 ${variant === "transparent" ? 'bg-transparent' : 'bg-primary-500'} w-full h-16 px-12 flex justify-between`}>
            <div className='h-full flex items-center gap-16'>
                <img src={logo} alt="Civil Engineering Logo" className="h-10" />
                <div className='h-full flex gap-6 items-center'>
                    <NavBarItem to="/" label="หน้าแรก" />
                    <NavBarItem to="/pricing" label="ราคา" />
                    <NavBarItem to="/howto" label="ขั้นตอนรับบริการ" />
                    <NavBarItem to="/contact" label="ติดต่อเรา" />
                </div>
            </div>
            <div className='flex items-center gap-4'>

                {!user ? (
                    <>
                        <Link to={'/auth/signup'}>
                            <Button variant="outlinelight" size="sm" >ลงทะเบียน</Button>
                        </Link>
                        <Link to={'/auth/signin'}>
                            <Button variant="defaultlight" size="sm">ลงชื่อเข้าใช้</Button>
                        </Link>
                    </>
                ) : (

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className='flex gap-1 bg-transparent text-slate-50'>
                            <Button variant="ghost" size="sm" className='group text-slate-50 hover:bg-slate-100 hover:bg-opacity-25 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'>
                                {user.displayName || user.email}
                                <ChevronDownIcon className="h-6 w-6 transition duration-300 data-[state=open]:bg-black group-data-[state=open]:rotate-180" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>ข้อมูลส่วนตัว</DropdownMenuItem>
                            <Link to="/reservation"><DropdownMenuItem>คำขอรับบริการของฉัน</DropdownMenuItem></Link>
                            <DropdownMenuItem>ตั้งค่า</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleSignOut}>ออกจากระบบ</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

            </div>
        </div>
    );
}

const NavBarItem = ({ to, label, className }: { to: string; label: string; className?: string }) => {
    return (
        <Link to={to} className={`flex h-full items-center ${className}`}>
            <Button variant="ghost" size="sm" className='text-slate-50 hover:bg-slate-100 hover:bg-opacity-25 hover:text-slate-50'>
                {label}
            </Button>
        </Link>
    );
};

