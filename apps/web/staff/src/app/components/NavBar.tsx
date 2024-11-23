import { Button } from '@ce-lab-mgmt/shared-ui';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo-civil-engineering.svg';

export default function NavBar({ variant }: { variant?: string }) {
  const { t } = useTranslation('translation', { keyPrefix: 'navbar' });

  return (
    <div
      className={`fixed top-0 z-50 ${
        variant === 'transparent' ? 'bg-transparent' : 'bg-primary-500'
      } w-full h-16 px-12 flex justify-between`}
    >
      <div className="h-full flex items-center gap-16">
        <img src={logo} alt="Civil Engineering Logo" className="h-10" />
        <div className="h-full flex gap-6 items-center">
          <NavBarItem to="/" label={t('homepage')} />
          <NavBarItem to="/testForms" label={t('testForm')} />
          <NavBarItem to="/reservations" label={t('reservation')} />
          <NavBarItem to="/wages" label={t('wage')} />
        </div>
      </div>
      <div className="flex items-center gap-4 text-slate-50">User Area To Be Implemented</div>
    </div>
  );
}

const NavBarItem = ({
  to,
  label,
  className,
}: {
  to: string;
  label: string;
  className?: string;
}) => {
  return (
    <Link to={to} className={`flex h-full items-center ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        className="text-slate-50 hover:bg-slate-100 hover:bg-opacity-25 hover:text-slate-50"
      >
        {label}
      </Button>
    </Link>
  );
};
