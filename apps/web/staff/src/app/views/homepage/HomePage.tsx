import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation('translation', { keyPrefix: 'homepage' });
  return (
    <div className="p-32 flex flex-col gap-8">
      <h2>{t('title')}</h2>
      <div className="flex flex-col">To Be Implemented </div>
    </div>
  );
}
