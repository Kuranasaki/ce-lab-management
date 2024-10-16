export function apiInterfaces(): string {
  return 'api-interfaces';
}

export class Response<T> {
  success: boolean;
  data: T | null;

  constructor(success: boolean, data: T) {
    this.success = success;
    this.data = data;
  }
}
