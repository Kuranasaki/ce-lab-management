export class Certificate {
  constructor(
    public readonly id: string,
    public readonly createdOn: Date,
    public readonly fileName: string,
    public readonly fileSize: number,
    public readonly mimeType: string,
    public readonly url: string
  ) {
    this.createdOn = createdOn;
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.mimeType = mimeType;
    this.url = url;
  }

  getDescription(): string {
    const units = ['B', 'KB', 'MB', 'GB'] as const;
    const unitSize = 1024;

    if (this.fileSize === 0) return '0 B';
    if (this.fileSize < 0) throw new Error('File size cannot be negative');

    const exponent = Math.min(
      Math.floor(Math.log(this.fileSize) / Math.log(unitSize)),
      units.length - 1
    );

    const size = this.fileSize / Math.pow(unitSize, exponent);
    return `${size.toFixed(exponent === 0 ? 0 : 2)} ${units[exponent]}`;
  }
}
