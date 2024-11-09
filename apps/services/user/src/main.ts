import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { UserRepository } from './repository/userRepo';
import { AuthService } from './service/auth';
import firebase from 'firebase-admin';
import mongoose from 'mongoose';
import { UserSchema, UserAPI } from '@ce-lab-mgmt/api-interfaces';

firebase.initializeApp();
mongoose.connect(Bun.env.USER_MONGO_URI ?? '');
const UserModel = mongoose.model('User', UserSchema);

const userRepository = new UserRepository(UserModel);
const authService = new AuthService(
  userRepository,
  Bun.env.CUSSO_APP_ID ?? '',
  Bun.env.CUSSO_APP_SECRET ?? ''
);

export const App = new Elysia()
  .use(
    swagger({
      provider: 'scalar',
      path: '/swagger',
      documentation: {
        info: {
          title: 'CE Lab API Documentation',
          version: '1.0.0',
        },
        tags: [{ name: 'Pricing', description: 'User endpoints' }],
      },
    })
  )
  .use(cors())
  .post(
    '/auth/sso',
    async ({ body }) => {
      const { ticket } = body;
      const token = await authService.authenticateUser('sso', { ticket });
      return { token };
    },
    {
      body: UserAPI.CUSSORequestSchema,
      response: UserAPI.CUSSOResponseSchema,
    }
  )
  .post(
    '/auth/ldap',
    async ({ body }) => {
      const { username, password } = body;
      const token = await authService.authenticateUser('ldap', {
        username,
        password,
      });
      return { token };
    },
    {
      body: UserAPI.CULDAPRequestSchema,
      response: UserAPI.CULDAPResponseSchema,
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);