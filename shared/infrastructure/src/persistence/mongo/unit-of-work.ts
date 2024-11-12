import { MongoClient, ClientSession } from 'mongodb';
import { IUnitOfWork } from '../interface';
export class MongoUnitOfWork implements IUnitOfWork {
  private session: ClientSession | null = null;

  constructor(private readonly client: MongoClient) {}

  async startTransaction(): Promise<void> {
    this.session = await this.client.startSession();
    await this.session.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    if (this.session) {
      await this.session.commitTransaction();
      await this.session.endSession();
      this.session = null;
    }
  }

  async rollbackTransaction(): Promise<void> {
    if (this.session) {
      await this.session.abortTransaction();
      await this.session.endSession();
      this.session = null;
    }
  }
}