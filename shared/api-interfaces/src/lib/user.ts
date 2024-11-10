// src/shared/types/user.ts

import { Document, Schema } from 'mongoose';
import { t } from 'elysia';

export interface IUser {
  uid: string;
  username: string;
  gecos: string;
  email: string;
  roles: string[];
  ouid: string;
  firebaseUserId?: string;
}

export interface IUserDocument extends IUser, Document {}

export const UserSchema = new Schema<IUser>({
  uid: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  gecos: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: [{ type: String, required: true }],
  ouid: { type: String, required: true },
  firebaseUserId: { type: String, unique: true, sparse: true },
});

export const ElysiaUserSchema = t.Object({
  uid: t.String(),
  username: t.String(),
  gecos: t.String(),
  email: t.String(),
  roles: t.Array(t.String()),
  ouid: t.String(),
  firebaseUserId: t.Optional(t.String()),
});