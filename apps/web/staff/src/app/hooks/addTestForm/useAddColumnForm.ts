import { useForm } from 'react-hook-form';
import {
  AddColumnData,
  addColumnDataSchema,
} from '../../domain/entity/addTestForm/addTestFormFormEntity';
import { zodResolver } from '@hookform/resolvers/zod';

export default function useAddColumnForm() {
  const form = useForm<AddColumnData>({
    resolver: zodResolver(addColumnDataSchema),
    defaultValues: {
      label: '',
      dataType: '',
      dataFirstColumn: '',
      dataLastColumn: '',
    },
  });

  return { form };
}
