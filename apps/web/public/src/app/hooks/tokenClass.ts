export class AuthClass {
  static token: string;
  static userId: string;

  static getToken(): string {
    return this.token;
  }

  static setToken(token: string): void {
    if (token === '') return;
    this.token = token;
  }

  static getUserId(): string {
    return this.userId;
  }
  static setUserId(userId: string): void {
    this.userId = userId;
  }

  static login(token: string, userId: string): void {
    this.token = token;
    this.userId = userId;
  }

  static logout(): void {
    this.token = '';
    this.userId = '';
  }
}
