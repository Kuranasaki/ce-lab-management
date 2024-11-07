import { Button, Input } from '@ce-lab-mgmt/shared-ui';
import { PlusIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';

export default function ViewAllTestFormPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'testForm.viewAll',
  });
  return (
    <div className="flex flex-col px-40 gap-8 w-full">
      <h2 className="w-full text-center">{t('title')}</h2>
      <div className="flex flex-row w-full justify-between">
        <Input className="w-80" placeholder={t('searchFormPlaceHolder')} />
        <Button size="sm">
          <PlusIcon className="stroke-slate-50" />
          {t('addButtonText')}
        </Button>
      </div>
    </div>
  );
}
