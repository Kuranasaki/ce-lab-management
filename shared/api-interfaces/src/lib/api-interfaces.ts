export function apiInterfaces(): string {
  return 'api-interfaces';
}

export class Error {
  code: number;

  constructor(code: number) {
    this.code = code;
  }
}

export class BaseResponse<T> {
  data?: T;
  error?: Error;

  constructor({ data, error }: { data?: T; error?: Error }) {
    this.data = data;
    this.error = error;
  }
}
