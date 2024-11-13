import { t } from 'elysia';

export const CUSSORequestSchema = t.Object({
  ticket: t.String(),
});

export const CUSSOResponseSchema = t.Object({
  token: t.String(),
});

export const CULDAPRequestSchema = t.Object({
  username: t.String(),
  password: t.String(),
});

export const CULDAPResponseSchema = t.Object({
  token: t.String(),
});