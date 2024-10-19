import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  orgName: z
    .string()
    .min(1, 'โปรดระบุชื่อบริษัทหรือหน่วยงาน')
    .max(255, 'โปรดระบุไม่เกิน 255 ตัวอักษร'),
  orgProjectName: z.string().max(255, 'โปรดระบุไม่เกิน 255 ตัวอักษร'),
  orgAddress: z
    .string()
    .min(1, 'โปรดระบุที่อยู่')
    .max(255, 'โปรดระบุไม่เกิน 255 ตัวอักษร'),
  orgEmail: z.string().min(1, 'โปรดระบุอีเมล').email('โปรดระบุอีเมลที่ถูกต้อง'),
  orgPhone: z
    .string()
    .min(1, 'โปรดระบุเบอร์โทรศัพท์')
    .min(9, 'โปรดระบุเบอร์โทรศัพท์ที่ถูกต้อง')
    .max(10, 'โปรดระบุเบอร์โทรศัพท์ที่ถูกต้อง')
    .regex(/^\d+$/, 'โปรดระบุเบอร์โทรศัพท์ที่ถูกต้อง'),
  orgFax: z.string(),
});

export default function useOrgInfoForm(setStage: (stage: number) => void) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orgName: '',
      orgProjectName: '',
      orgAddress: '',
      orgEmail: '',
      orgPhone: '',
      orgFax: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setStage(2);
  }

  return { orgForm: form, onOrgSubmit: onSubmit };
}
