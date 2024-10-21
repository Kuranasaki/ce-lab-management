import { Elysia } from 'elysia';
import mongoose from 'mongoose';

mongoose.connect(Bun.env.RESV_MONGO_URI ?? '');

const app = new Elysia().get('/', () => 'Hello Elysia').listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
