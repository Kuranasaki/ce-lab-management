import { t } from 'elysia';

export const GetAllTestFormRequestParamsSchema = t.Object({
  page: t.Optional(t.Integer()), // default 1
  limit: t.Optional(t.Integer()), // default 10
});

export const GetAllTestFormResponseSchema = t.Array(
  t.Object({
    id: t.String(),
    name: t.String(),
  })
);
