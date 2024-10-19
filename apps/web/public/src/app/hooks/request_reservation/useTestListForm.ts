import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  testType: z.string().min(1),
  testList: z.array(z.any()).min(1),
});

export default function useTestListForm(setStage: (stage: number) => void) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      testType: '',
      testList: [],
    },
  });

  function onSubmit() {
    setStage(3);
  }

  return { testListForm: form, onTestListSubmit: onSubmit };
}
