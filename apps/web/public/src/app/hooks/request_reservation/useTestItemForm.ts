import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const testItemFormSchema = z.object({
  testName: z.string().min(1),
  testSubName: z.string().min(1),
  testAmount: z.number(),
  testDetails: z
    .string()
    .max(255, 'รายละเอียดต้องมีความยาวไม่เกิน 255 ตัวอักษร'),
  testNote: z.string().max(255, 'หมายเหตุต้องมีความยาวไม่เกิน 255 ตัวอักษร'),
});

export function useTestItemForm(initialData?: {
  testName: string;
  testSubName: string;
  testAmount: number;
  testDetails: string;
  testNote: string;
}) {
  const form = useForm<z.infer<typeof testItemFormSchema>>({
    resolver: zodResolver(testItemFormSchema),
    defaultValues: initialData ?? {
      testName: '',
      testSubName: '',
      testAmount: undefined,
      testDetails: '',
      testNote: '',
    },
  });

  return { testItemForm: form };
}
