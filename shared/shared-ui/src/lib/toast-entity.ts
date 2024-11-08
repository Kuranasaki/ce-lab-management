export class ToastEntity {
  title: string;
  description: string;
  variant: 'default' | 'success' | 'warning' | 'destructive';

  constructor(
    title: string,
    description: string,
    type: 'default' | 'success' | 'warning' | 'destructive'
  ) {
    this.title = title;
    this.description = description;
    this.variant = type;
  }

  static fromCode(code: number): ToastEntity {
    if (code === 200) {
      return this.success();
    }
    // To be implemented
    return this.unknownError();
  }
  static success(): ToastEntity {
    return new ToastEntity('สำเร็จ', 'ทำรายการสำเร็จ', 'success');
  }
  static unknownError(): ToastEntity {
    return new ToastEntity(
      'เกิดข้อผิดพลาด',
      'ไม่สามารถทำรายการได้ในขณะนี้ โปรดลองอีกครั้งในภายหลัง',
      'destructive'
    );
  }
}
