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
}
