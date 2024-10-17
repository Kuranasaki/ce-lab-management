export class ToastEntity {
  title: string;
  description: string;
  type: 'error' | 'success' | 'info' | 'warning';

  constructor(
    title: string,
    description: string,
    type: 'error' | 'success' | 'info' | 'warning'
  ) {
    this.title = title;
    this.description = description;
    this.type = type;
  }

  static fromCode(code: number): ToastEntity {
    // To be implemented
    return this.unknownError();
  }

  static unknownError(): ToastEntity {
    return new ToastEntity(
      'Unknown Error',
      'An unknown error occurred.',
      'error'
    );
  }
}
