import { Pool, PoolClient } from 'pg';
import {  IUnitOfWork } from '../interface';

export class PostgresUnitOfWork implements IUnitOfWork {
  private client: PoolClient | null = null;

  constructor(private readonly pool: Pool) {}

  async startTransaction(): Promise<void> {
    this.client = await this.pool.connect();
    await this.client.query('BEGIN');
  }

  async commitTransaction(): Promise<void> {
    if (this.client) {
      await this.client.query('COMMIT');
      this.client.release();
      this.client = null;
    }
  }

  async rollbackTransaction(): Promise<void> {
    if (this.client) {
      await this.client.query('ROLLBACK');
      this.client.release();
      this.client = null;
    }
  }
}
