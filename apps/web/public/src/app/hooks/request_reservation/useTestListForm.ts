import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  testListformSchema,
  TestListFormType,
} from '../../domain/entity/request_reservation/reqReservRequestFormEntity';

export function useTestListForm() {
  const form = useForm<TestListFormType>({
    resolver: zodResolver(testListformSchema),
    defaultValues: {
      testType: '',
      testList: [],
    },
  });

  return { testListForm: form };
}
