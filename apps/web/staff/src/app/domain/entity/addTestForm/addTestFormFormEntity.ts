import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
export const addTestFormFormSchema = z.object({
  name: z.string().min(1),
  templateFile: z
    .custom<File | null>((file) => file === null || file instanceof File, {
      message: 'A file is required.',
    })
    .refine(
      (file) => file === null || (file && file.size <= 50 * 1024 * 1024),
      {
        message: 'File size must be less than 50 MB.',
      }
    )
    .refine(
      (file) =>
        file === null ||
        (file &&
          (file.type ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'application/vnd.ms-excel')),
      {
        message: 'Only Excel files are allowed.',
      }
    )
    .refine((file) => file !== null, {
      message: 'A file is required to submit.',
    }),
  dataSheetName: z.string().min(1),
  dataFirstRow: z.number(),
  dataLastRow: z.number(),
  dataColumn: z
    .array(
      z.object({
        label: z.string(),
        dataType: z.string(),
        dataFirstColumn: z.string(),
        dataLastColumn: z.string(),
      })
    )
    .min(1),
});

export type AddTestFormFormType = z.infer<typeof addTestFormFormSchema>;
export type AddTestFormFormReturned = UseFormReturn<AddTestFormFormType>;

const letterToNumber = (str: string): number => {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result +=
      26 ** (str.length - i - 1) * (str.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
  }
  return result;
};

export const addColumnDataSchema = z
  .object({
    label: z.string().min(1),
    dataType: z.string().min(1),
    dataFirstColumn: z.string().regex(/^[A-Z]{1,2}$/, {
      message: 'Invalid',
    }),
    dataLastColumn: z.string().regex(/^[A-Z]{1,2}$/, {
      message: 'Invalid',
    }),
  })
  .refine(
    ({ dataFirstColumn, dataLastColumn }) =>
      letterToNumber(dataFirstColumn) <= letterToNumber(dataLastColumn),
    {
      message: 'Last column must come after first column.',
      path: ['root'],
    }
  );

export type AddColumnData = z.infer<typeof addColumnDataSchema>;
export type AddColumnDataReturned = UseFormReturn<AddColumnData>;
