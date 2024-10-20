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
    .min(1, 'โปรดระบุหมายเลขโทรศัพท์')
    .regex(/^0\d{8,9}$/, 'โปรดระบุหมายเลขโทรศัพท์ที่ถูกต้อง'),
  orgFax: z
    .string()
    .regex(/^0\d{8}$/, 'โปรดระบุหมายเลขโทรสารที่ถูกต้อง')
    .or(z.literal('')),
});

export function useOrgInfoForm() {
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

  return { orgForm: form };
}

export type OrgInfoForm = ReturnType<typeof useOrgInfoForm>['orgForm'];
