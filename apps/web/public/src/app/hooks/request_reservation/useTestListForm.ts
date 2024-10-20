import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { testItemFormSchema } from './useTestItemForm';

const formSchema = z.object({
  testType: z.string().min(1),
  testList: z
    .array(testItemFormSchema)
    .min(1, 'กรุณาเพิ่มรายการทดสอบอย่างน้อย 1 รายการ'),
});

export function useTestListForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      testType: '',
      testList: [],
    },
  });

  return { testListForm: form };
}

export type TestListForm = ReturnType<typeof useTestListForm>['testListForm'];
