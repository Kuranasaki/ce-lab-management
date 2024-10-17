import { useTranslation } from 'react-i18next';

export default function TranslationExample() {
  const { t } = useTranslation();

  return <div>{t('example')}</div>;
}
