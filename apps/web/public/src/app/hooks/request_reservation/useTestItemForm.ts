import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const testItemFormSchema = z.object({
  testName: z.string().min(1),
  testSubName: z.string().min(1),
  testAmount: z
    .number({
      required_error: 'กรุณาระบุจำนวนหน่วย',
    })
    .min(1, 'จำนวนต้องมากกว่า 0'),
  testDetails: z
    .string()
    .max(255, 'รายละเอียดต้องมีความยาวไม่เกิน 255 ตัวอักษร'),
  testNote: z.string().max(255, 'หมายเหตุต้องมีความยาวไม่เกิน 255 ตัวอักษร'),
});

export function useTestItemForm() {
  const form = useForm<z.infer<typeof testItemFormSchema>>({
    resolver: zodResolver(testItemFormSchema),
    defaultValues: {
      testName: '',
      testSubName: '',
      testAmount: undefined,
      testDetails: '',
      testNote: '',
    },
  });

  return { testItemForm: form };
}

export type TestItemForm = ReturnType<typeof useTestItemForm>['testItemForm'];

export type TestItemFormDataType = z.infer<typeof testItemFormSchema>;
