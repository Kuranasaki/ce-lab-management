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
    if (this.fileSize < 1024) {
      return `${this.fileSize} B`;
    } else if (this.fileSize < 1024 * 1024) {
      return `${(this.fileSize / 1024).toFixed(2)} KB`;
    } else if (this.fileSize < 1024 * 1024 * 1024) {
      return `${(this.fileSize / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(this.fileSize / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  }
}
