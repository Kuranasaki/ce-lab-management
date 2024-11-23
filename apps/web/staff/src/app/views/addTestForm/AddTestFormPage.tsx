import { useTranslation } from 'react-i18next';
import AddTestForm from './components/AddTestForm';
import AddTestFormDataPreview from './components/AddTestFormDataPreview';
import useAddTestFormForm from '../../hooks/addTestForm/useAddTestFormForm';
import { Button, Form } from '@ce-lab-mgmt/shared-ui';

export default function AddTestFormPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'testForm.add',
  });
  const { form, addColumn, handleSubmit } = useAddTestFormForm();
  return (
    <div className="flex flex-col px-40 gap-8">
      <h2>{t('title')}</h2>
      <Form {...form}>
        <form className="flex flex-col gap-8">
          <AddTestForm form={form} addCol={addColumn} />
          <AddTestFormDataPreview />
          <div className="w-full flex flex-row justify-end">
            <Button variant="accept" onClick={form.handleSubmit(handleSubmit)}>
              {t('form.submit')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
