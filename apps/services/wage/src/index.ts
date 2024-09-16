import { Elysia } from 'elysia';
import { router } from './trpc/instances';
import { trpc } from '@elysiajs/trpc';
import { statementMethod } from './methods/statementMethod';
import { connectDB } from './config/database';
import { renderTrpcPanel } from 'trpc-panel';
import html from '@elysiajs/html';

// Create the app router
const appRouter = router(statementMethod);

const app = new Elysia()
  .use(trpc(appRouter))
  .use(html())  // Ensure HTML handling middleware is used
  .get("/panel", () => { 
    return renderTrpcPanel(appRouter, { url: "http://localhost:3000/trpc" });
  })
  .listen(3000, async () => {
    await connectDB(); // Connect to the database when the server starts
    console.log(`🦊 Elysia is running at http://localhost:3000`);
  });

export type AppRouter = typeof appRouter;
