import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from '@ce-lab-mgmt/shared-ui';
import { AddTestFormFormReturned } from '../../../domain/entity/addTestForm/addTestFormFormEntity';
import { useTranslation } from 'react-i18next';

export default function AddTestForm({
  form,
}: {
  form: AddTestFormFormReturned;
}) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'testForm.add',
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8">
        {/* Name */}
        <div className="flex flex-col gap-5">
          <h4>{t('form.name.label')}</h4>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <Input placeholder={t('form.name.placeholder')} {...field} />
            )}
          />
        </div>

        {/* Template File */}
        <div className="flex flex-col gap-4">
          <h4>{t('form.file.label')}</h4>
          <FormField
            control={form.control}
            name="templateFile"
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  {t('form.file.button', 'Choose File')}
                </Button>
                <p className="text-slate-500">
                  {field.value?.name ||
                    t('form.file.placeholder', 'No file chosen')}
                </p>
                <Input
                  id="file-input"
                  type="file"
                  onChange={(e) => {
                    form.setValue('templateFile', e.target.files?.[0] ?? null);
                  }}
                  className="hidden"
                />
              </div>
            )}
          />
        </div>

        {/* Data Area */}
        <div className="flex flex-col gap-4">
          <h4>{t('form.dataAreaTitle')}</h4>

          {/* Sheet Name */}
          <FormField
            control={form.control}
            name="dataSheetName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.dataArea.sheet.label')}</FormLabel>
                <Input
                  placeholder={t('form.dataArea.sheet.placeholder')}
                  {...field}
                />
              </FormItem>
            )}
          />

          {/* Row */}
          <div className="flex gap-4 items-center">
            <p className="min-w-28 font-medium">
              {t('form.dataArea.row.title')}
            </p>
            <div className="grid grid-cols-2 gap-2 w-full">
              <FormField
                control={form.control}
                name="dataFirstRow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.dataArea.row.startLabel')}</FormLabel>
                    <Input
                      type="number"
                      placeholder={t('form.dataArea.row.startPlaceholder')}
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataLastRow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.dataArea.row.endLabel')}</FormLabel>
                    <Input
                      type="number"
                      placeholder={t('form.dataArea.row.endPlaceholder')}
                      {...field}
                    />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Column */}
          <div className="flex flex-col gap-2">
            <p className="medium">{t('form.dataArea.column.title')}</p>
          </div>
        </div>
      </form>
    </Form>
  );
}
