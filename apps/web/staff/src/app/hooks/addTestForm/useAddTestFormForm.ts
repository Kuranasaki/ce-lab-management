import { useForm } from 'react-hook-form';
import {
  AddColumnDataReturned,
  addTestFormFormSchema,
  AddTestFormFormType,
} from '../../domain/entity/addTestForm/addTestFormFormEntity';
import { zodResolver } from '@hookform/resolvers/zod';

// Utility function to convert column letters (like 'A', 'Z', 'AA') to numbers
const letterToNumber = (str: string): number => {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result +=
      26 ** (str.length - i - 1) * (str.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
  }
  return result;
};

export default function useAddTestFormForm() {
  const form = useForm<AddTestFormFormType>({
    resolver: zodResolver(addTestFormFormSchema),
    defaultValues: {
      name: '',
      templateFile: undefined,
      dataSheetName: '',
      dataFirstRow: undefined,
      dataLastRow: undefined,
      dataColumn: [],
    },
  });

  const addColumn = (addColumnForm: AddColumnDataReturned) => {
    const newColumn = addColumnForm.getValues();
    const currentColumns = form.getValues('dataColumn');

    if (currentColumns.length > 0) {
      // Get the `dataLastColumn` of the last item in `dataColumn`
      const lastColumn = currentColumns[currentColumns.length - 1];

      // Compare the first column of the new column with the last column of the existing columns
      if (
        letterToNumber(newColumn.dataFirstColumn) <=
        letterToNumber(lastColumn.dataLastColumn)
      ) {
        // Set an error on `dataFirstColumn` field in the new column form
        addColumnForm.setError('dataFirstColumn', {
          message:
            'Data first column must come after the last column of the previous column',
        });
        return; // Stop execution if validation fails
      }
    }

    // If validation passes, add the new column to `dataColumn`
    form.setValue('dataColumn', [...currentColumns, newColumn]);
    addColumnForm.reset();
  };

  const handleSubmit = () => {
    console.log(form.getValues());
    // TODO: Handle form submission
  };

  return { form, addColumn, handleSubmit };
}
