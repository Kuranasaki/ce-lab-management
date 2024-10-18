import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@ce-lab-mgmt/shared-ui';
import logo from '../../../src/assets/logo-civil-engineering.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from "@radix-ui/react-icons"

export default function NavBar() {

    const [isSignin, setIsSignin] = useState(true);

    useEffect(() => {
        return () => {

        };
    }, [isSignin]);



    return (
        <div className="w-full h-16 bg-primary-500 px-12 flex justify-between">
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

                {!isSignin ? (
                    <>
                        <Link to={'/signin'}>
                            <Button variant="outline" size="sm" className='border-slate-50 text-slate-50 bg-transparent hover:text-slate-50 hover:bg-slate-50 hover:bg-opacity-5'>ลงทะเบียน</Button>
                        </Link>
                        <Link to={'/signup'}>
                            <Button variant="default" size="sm" className='text-primary-50 bg-slate-50 hover:text-primary-50 hover:bg-slate-100'>ลงชื่อเข้าใช้</Button>
                        </Link>
                    </>
                ) : (

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className='flex gap-1 bg-transparent text-slate-50'>
                            <Button variant="ghost" size="sm" className='group text-slate-50 hover:bg-slate-100 hover:bg-opacity-25 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'>
                                Papon Kluebmongkol
                                <ChevronDownIcon className="h-6 w-6 transition duration-300 data-[state=open]:bg-black group-data-[state=open]:rotate-180" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>ข้อมูลส่วนตัว</DropdownMenuItem>
                            <DropdownMenuItem>คำขอรับบริการของฉัน</DropdownMenuItem>
                            <DropdownMenuItem>ตั้งค่า</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsSignin(false)}>ออกจากระบบ</DropdownMenuItem>
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

