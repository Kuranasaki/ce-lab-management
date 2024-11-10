import { MongoClient, Db } from 'mongodb';

export class MongoService {
  private static client: MongoClient;
  private static db: Db;

  static async connect(uri: string, dbName: string): Promise<void> {
    if (!MongoService.client) {
      MongoService.client = new MongoClient(uri);
      await MongoService.client.connect();
      MongoService.db = MongoService.client.db(dbName);
    }
  }

  static getDb(): Db {
    if (!MongoService.db) {
      throw new Error('MongoDB not connected');
    }
    return MongoService.db;
  }

  static getClient(): MongoClient {
    if (!MongoService.client) {
      throw new Error('MongoDB not connected');
    }
    return MongoService.client;
  }
}