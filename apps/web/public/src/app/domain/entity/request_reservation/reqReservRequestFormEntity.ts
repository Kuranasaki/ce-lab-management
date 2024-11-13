import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
export const orgFormSchema = z.object({
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
export type OrgInfoFormType = z.infer<typeof orgFormSchema>;
export type OrgInfoFormReturned = UseFormReturn<OrgInfoFormType>;

export const testItemFormSchema = z.object({
  testID: z.string().min(1),
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
  testUnit: z.string().min(1),
  testTotalPrice: z
    .number({
      required_error: 'กรุณาระบุราคารวม',
    })
    .min(1, 'ราคารวมต้องมากกว่า 0'),
  testPricePerUnit: z
    .number({
      required_error: 'กรุณาระบุราคา',
    })
    .min(1, 'ราคาต้องมากกว่า 0'),
});
export type TestItemFormType = z.infer<typeof testItemFormSchema>;
export type TestItemFormReturned = UseFormReturn<TestItemFormType>;

export const testListformSchema = z.object({
  testType: z.string().min(1),
  testList: z
    .array(testItemFormSchema)
    .min(1, 'กรุณาเพิ่มรายการทดสอบอย่างน้อย 1 รายการ'),
});
export type TestListFormType = z.infer<typeof testListformSchema>;
export type TestListFormReturned = UseFormReturn<TestListFormType>;
