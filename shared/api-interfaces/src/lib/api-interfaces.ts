import { t, Static, TSchema } from 'elysia';
import { PaginationParamsSchema } from '@ce-lab-mgmt/core-utils';
import { ReservationSchema } from './reservation';

export function apiInterfaces(): string {
  return 'api-interfaces';
}

export class Error {
  code: number;

  constructor(code: number) {
    this.code = code;
  }
}

// export class BaseResponse<T> {
//   data?: T;
//   error?: Error;

//   constructor({ data, error }: { data?: T; error?: Error }) {
//     this.data = data;
//     this.error = error;
//   }
//   toJSON(): { data?: T; error?: Error } {
//     return {
//       data: this.data,
//       error: this.error
//     };
//   }
// }

// function BaseResponseFn(T: TAnySchema) {
//   return t.Object({
//     data: t.Optional(T),
//     error: t.Optional(
//       t.Object({
//         code: t.Number(),
//       })
//     ),
//     meta: t.Optional(t.Object({})),
//   });
// }

export const ApiErrorSchema = t.Object({
  message: t.String(),
  code: t.Optional(t.Numeric()),
});

export const PaginationMetaSchema = t.Object({
  total: t.Number(),
  page: t.Number(),
  limit: t.Number(),
  totalPages: t.Number(),
});

export const BaseResponseSchema = t.Object({
  success: t.Boolean(),
  data: t.Optional(t.Any()),
  error: t.Optional(ApiErrorSchema),
  meta: t.Optional(
    t.Object({
      pagination: t.Optional(PaginationMetaSchema),
    })
  ),
});

export type BaseResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: Static<typeof ApiErrorSchema>;
  meta?: {
    pagination?: Static<typeof PaginationMetaSchema>;
  };
};

export const BaseResponseSchemaFn = <T extends TSchema>(dataSchema: T) =>
  t.Object({
    success: t.Boolean(),
    data: t.Optional(dataSchema),
    error: t.Optional(ApiErrorSchema),
    meta: t.Optional(
      t.Object({
        pagination: t.Optional(PaginationMetaSchema),
      })
    ),
  });

// example
// const UserRespSche = BaseResponseSchemaFn(PaginationMetaSchema)
// type IdontUseEdenSoEatThis = Static<typeof UserRespSche>
