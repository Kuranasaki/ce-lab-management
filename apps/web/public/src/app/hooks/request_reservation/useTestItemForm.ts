import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  TestItemFormType,
  testItemFormSchema,
} from '../../domain/entity/request_reservation/reqReservRequestFormEntity';

export function useTestItemForm() {
  const form = useForm<TestItemFormType>({
    resolver: zodResolver(testItemFormSchema),
    defaultValues: {
      testID: '',
      testName: '',
      testSubName: '',
      testAmount: undefined,
      testDetails: '',
      testNote: '',
    },
  });

  return { testItemForm: form };
}
