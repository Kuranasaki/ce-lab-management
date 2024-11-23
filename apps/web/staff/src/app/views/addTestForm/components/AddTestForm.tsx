import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ce-lab-mgmt/shared-ui';
import {
  AddColumnDataReturned,
  AddTestFormFormReturned,
} from '../../../domain/entity/addTestForm/addTestFormFormEntity';
import { useTranslation } from 'react-i18next';
import useAddColumnForm from '../../../hooks/addTestForm/useAddColumnForm';
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { useWatch } from 'react-hook-form';

export default function AddTestForm({
  form,
  addCol,
}: {
  form: AddTestFormFormReturned;
  addCol: (data: AddColumnDataReturned) => void;
}) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'testForm.add',
  });
  const { form: addColForm } = useAddColumnForm();

  useWatch({
    control: form.control,
    name: 'dataColumn',
    defaultValue: [],
  });

  return (
    <>
      {/* Name */}
      <div className="flex flex-col gap-5">
        <h4>{t('form.name.label')}</h4>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Input
              className={form.formState.errors.name && 'ring-1 ring-error-500'}
              placeholder={t('form.name.placeholder')}
              {...field}
            />
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
              <p
                className={
                  form.formState.errors.templateFile
                    ? ' text-error-500'
                    : 'text-slate-500'
                }
              >
                {field.value?.name ||
                  t('form.file.placeholder', 'No file chosen')}
              </p>
              <Input
                id="file-input"
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    field.onChange(e.target.files?.[0]);
                    form.setValue('templateFile', e.target.files?.[0]);
                  }
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
                className={
                  form.formState.errors.dataSheetName && 'ring-1 ring-error-500'
                }
                placeholder={t('form.dataArea.sheet.placeholder')}
                {...field}
              />
            </FormItem>
          )}
        />

        {/* Row */}
        <div className="flex gap-4 items-center">
          <p className="min-w-28 font-medium">{t('form.dataArea.row.title')}</p>
          <div className="grid grid-cols-2 gap-2 w-full">
            <FormField
              control={form.control}
              name="dataFirstRow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.dataArea.row.startLabel')}</FormLabel>
                  <Input
                    className={
                      form.formState.errors.dataFirstRow &&
                      'ring-1 ring-error-500'
                    }
                    type="number"
                    placeholder={t('form.dataArea.row.startPlaceholder')}
                    value={field.value ?? ''} // Handle case when value is undefined
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
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
                    className={
                      form.formState.errors.dataLastRow &&
                      'ring-1 ring-error-500'
                    }
                    type="number"
                    placeholder={t('form.dataArea.row.endPlaceholder')}
                    value={field.value ?? ''} // Handle case when value is undefined
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Column */}
        <div className="flex flex-col gap-2">
          <p className="medium">{t('form.dataArea.column.title')}</p>
          <div
            className={
              'rounded-lg border border-slate-300 overflow-clip' +
              (form.formState.errors.dataColumn ? ' ring-1 ring-error-500' : '')
            }
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-2/5">
                    {t('form.dataArea.column.nameLabel')}
                  </TableHead>
                  <TableHead className="w-1/5">
                    {t('form.dataArea.column.typeLabel')}
                  </TableHead>
                  <TableHead className="w-1/5">
                    {t('form.dataArea.column.startLabel')}
                  </TableHead>
                  <TableHead className="w-1/5">
                    {t('form.dataArea.column.endLabel')}
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Current Columns */}
                {form.getValues('dataColumn').map((col, index) => (
                  <TableRow key={index}>
                    <TableCell className="w-2/5">
                      <p className="pl-2">{col.label}</p>
                    </TableCell>
                    <TableCell className="w-1/5">
                      <p className="pl-2">
                        {t(`form.dataArea.column.typeOptions.${col.dataType}`)}
                      </p>
                    </TableCell>
                    <TableCell className="w-1/5">
                      <p className="pl-2">{col.dataFirstColumn}</p>
                    </TableCell>
                    <TableCell className="w-1/5">
                      <p className="pl-2">{col.dataLastColumn}</p>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          form.setValue(
                            'dataColumn',
                            form
                              .getValues('dataColumn')
                              .filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <MinusCircledIcon className="size-5 stroke-error-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Add Column */}
                <Form {...addColForm}>
                  <TableRow>
                    <TableCell className="w-2/5">
                      <FormField
                        control={addColForm.control}
                        name="label"
                        render={({ field }) => (
                          <FormItem>
                            <Input
                              className={
                                addColForm.getFieldState('label').error &&
                                'ring-1 ring-error-500'
                              }
                              placeholder={t(
                                'form.dataArea.column.namePlaceholder'
                              )}
                              {...field}
                            />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="w-1/5">
                      <FormField
                        control={addColForm.control}
                        name="dataType"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={(e) => field.onChange(e)}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger
                                  className={
                                    addColForm.getFieldState('dataType')
                                      .error && 'ring-1 ring-error-500'
                                  }
                                >
                                  <SelectValue
                                    placeholder={t(
                                      'form.dataArea.column.typePlaceholder'
                                    )}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="text">
                                  {t('form.dataArea.column.typeOptions.text')}
                                </SelectItem>
                                <SelectItem value="number">
                                  {t('form.dataArea.column.typeOptions.number')}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="w-1/5">
                      <FormField
                        control={addColForm.control}
                        name="dataFirstColumn"
                        render={({ field }) => (
                          <FormItem>
                            <Input
                              className={
                                addColForm.getFieldState('dataFirstColumn')
                                  .error && 'ring-1 ring-error-500'
                              }
                              placeholder={t(
                                'form.dataArea.column.startPlaceholder'
                              )}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const filteredValue = e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z]/g, '')
                                  .slice(0, 2);
                                field.onChange(filteredValue);
                              }}
                            />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="w-1/5">
                      <FormField
                        control={addColForm.control}
                        name="dataLastColumn"
                        render={({ field }) => (
                          <FormItem>
                            <Input
                              className={
                                addColForm.getFieldState('dataLastColumn')
                                  .error && 'ring-1 ring-error-500'
                              }
                              placeholder={t(
                                'form.dataArea.column.endPlaceholder'
                              )}
                              value={field.value ?? ''}
                              onChange={(e) => {
                                const filteredValue = e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z]/g, '')
                                  .slice(0, 2);
                                field.onChange(filteredValue);
                              }}
                            />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          addColForm.handleSubmit(() => {
                            addCol(addColForm);
                          })();
                        }}
                      >
                        <PlusCircledIcon className="size-5 stroke-success-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </Form>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
