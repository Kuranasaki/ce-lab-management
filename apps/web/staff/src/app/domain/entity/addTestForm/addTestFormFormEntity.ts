import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
export const addTestFormFormSchema = z.object({
  name: z.string().min(1),
  templateFile: z
    .custom<File | null>((file) => file === null || file instanceof File, {
      message: 'A file is required.',
    })
    .nullable() // Allows `templateFile` to be null
    .refine((file) => file === null || file.size <= 50 * 1024 * 1024, {
      message: 'File size must be less than 50 MB.',
    })
    .refine(
      (file) =>
        file === null ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel',
      {
        message: 'Only Excel files are allowed.',
      }
    ),
  dataSheetName: z.string().min(1),
  dataFirstRow: z.number(),
  dataLastRow: z.number(),
  dataColumn: z.array(
    z.object({
      label: z.string(),
      dataType: z.string(),
      dataFirstColumn: z.string(),
      dataLastColumn: z.string(),
    })
  ),
});

export type AddTestFormFormType = z.infer<typeof addTestFormFormSchema>;
export type AddTestFormFormReturned = UseFormReturn<AddTestFormFormType>;
