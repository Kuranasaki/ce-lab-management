export function apiInterfaces(): string {
  return 'api-interfaces';
}

export class Error {
  title: string;
  message: string;

  constructor(title: string, message: string) {
    this.title = title;
    this.message = message;
  }
}

export class Response<T> {
  success: boolean;
  data?: T;
  error?: Error;

  constructor(success: boolean, data?: T, error?: Error) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
}
