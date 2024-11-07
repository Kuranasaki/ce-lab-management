import { useTranslation } from 'react-i18next';
import AddTestForm from './components/AddTestForm';
import AddTestFormDataPreview from './components/AddTestFormDataPreview';
import useAddTestFormForm from '../../hooks/addTestForm/useAddTestFormForm';

export default function AddTestFormPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'testForm.add',
  });
  const [form] = useAddTestFormForm();
  return (
    <div className="flex flex-col px-40 gap-8">
      <h2>{t('title')}</h2>
      <AddTestForm form={form} />
      <AddTestFormDataPreview />
    </div>
  );
}
