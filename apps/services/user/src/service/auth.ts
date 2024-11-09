import { IUser } from "@ce-lab-mgmt/api-interfaces";
import { UserRepository } from "../repository/userRepo";
import firebase from 'firebase-admin';
import { SSOAuthProvider, SSOCredentials } from './sso';
import { LDAPAuthProvider, LDAPCredentials } from './ldap';


export interface IAuthProvider<T> {
  authenticate(credentials: T): Promise<IUser>;
}

export type AuthMethod = 'sso' | 'ldap';
export type AuthCredentials = SSOCredentials | LDAPCredentials;

export class AuthService {
  private userRepository: UserRepository;
  private authProviders: Map<AuthMethod, IAuthProvider<AuthCredentials>>;

  constructor(userRepository: UserRepository, ssoAppId: string, ssoAppSecret: string) {
    this.userRepository = userRepository;
    this.authProviders = new Map();
    this.authProviders.set('sso', new SSOAuthProvider(ssoAppId, ssoAppSecret));
    this.authProviders.set('ldap', new LDAPAuthProvider());
  }

  async authenticateUser<T extends AuthMethod>(
    method: T,
    credentials: T extends 'sso' ? SSOCredentials : LDAPCredentials
  ): Promise<string> {
    const authProvider = this.authProviders.get(method);
    if (!authProvider) {
      throw new Error(`Unsupported authentication method: ${method}`);
    }

    const userData = await authProvider.authenticate(credentials);
    const user = await this.findOrCreateUser(userData);
    const firebaseUser = await this.ensureFirebaseUser(user);
    const token = await this.generateCustomToken(firebaseUser.uid, user);

    return token;
  }

  private async findOrCreateUser(userData: IUser): Promise<IUser> {
    return this.userRepository.findOrCreateUser(userData);
  }

  private async ensureFirebaseUser(user: IUser): Promise<firebase.auth.UserRecord> {
    if (!user.firebaseUserId) {
      const firebaseUser = await firebase.auth().createUser({
        email: user.email,
        displayName: user.gecos,
      });
      await this.userRepository.updateFirebaseUserId(user.uid, firebaseUser.uid);
      return firebaseUser;
    }
    return firebase.auth().getUser(user.firebaseUserId);
  }

  private async generateCustomToken(firebaseUserId: string, user: IUser): Promise<string> {
    return firebase.auth().createCustomToken(firebaseUserId, {
      roles: user.roles,
      ouid: user.ouid,
    });
  }
}