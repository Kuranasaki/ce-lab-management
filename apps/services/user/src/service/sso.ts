// src/services/ssoService.ts

import axios from 'axios';
import { IUser } from '@ce-lab-mgmt/api-interfaces';
import { IAuthProvider } from './auth';

const SSO_VALIDATION_URL = 'https://account.it.chula.ac.th/serviceValidation';

export type SSOCredentials = {
  ticket: string;
};

export class SSOAuthProvider implements IAuthProvider<SSOCredentials> {
  private appId: string;
  private appSecret: string;

  constructor(appId: string, appSecret: string) {
    this.appId = appId;
    this.appSecret = appSecret;
  }

  async authenticate(credentials: SSOCredentials): Promise<IUser> {
    try {
      const response = await axios.get(SSO_VALIDATION_URL, {
        headers: {
          DeeAppId: this.appId,
          DeeAppSecret: this.appSecret,
          DeeTicket: credentials.ticket,
        },
      });

      if (response.status === 200) {
        return response.data as IUser;
      } else {
        throw new Error('Invalid ticket or permission');
      }
    } catch (error) {
      throw new Error('SSO validation failed');
    }
  }
}
