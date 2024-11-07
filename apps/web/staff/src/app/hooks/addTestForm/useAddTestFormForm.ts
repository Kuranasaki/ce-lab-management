import { useForm } from 'react-hook-form';
import {
  addTestFormFormSchema,
  AddTestFormFormType,
} from '../../domain/entity/addTestForm/addTestFormFormEntity';
import { zodResolver } from '@hookform/resolvers/zod';

export default function useAddTestFormForm() {
  const form = useForm<AddTestFormFormType>({
    resolver: zodResolver(addTestFormFormSchema),
    defaultValues: {
      name: '',
      templateFile: null,
      dataSheetName: '',
      dataFirstRow: 0,
      dataLastRow: 0,
      dataColumn: [],
    },
  });

  return [form];
}
