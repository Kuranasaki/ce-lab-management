import { IUser } from "@ce-lab-mgmt/api-interfaces";
import { IAuthProvider } from "./auth";

export type LDAPCredentials = {
  username: string;
  password: string;
};

export class LDAPAuthProvider implements IAuthProvider<LDAPCredentials> {
  async authenticate(credentials: LDAPCredentials): Promise<IUser> {
    // TODO: Implement LDAP authentication logic
    throw new Error('LDAP authentication not implemented');
  }
}
