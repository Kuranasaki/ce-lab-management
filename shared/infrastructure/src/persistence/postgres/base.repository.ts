import { Entity, EntityId, Result } from '@ce-lab-mgmt/domain';
import { Pool, PoolClient } from 'pg';
import { IRepository } from '../interface';

export abstract class PostgresRepository<T extends Entity> implements IRepository<T> {
  constructor(
    protected readonly pool: Pool,
    protected readonly tableName: string
  ) {}

  protected abstract toEntity(row: Record<string, any>): T;
  protected abstract toRow(entity: T): Record<string, any>;

  async findById(id: EntityId): Promise<Result<T | null>> {
    try {
      const { rows } = await this.pool.query(
        `SELECT * FROM ${this.tableName} WHERE id = $1`,
        [id]
      );
      
      if (rows.length === 0) {
        return Result.ok(null);
      }

      return Result.ok(this.toEntity(rows[0]));
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async save(entity: T): Promise<Result<T>> {
    try {
      const row = this.toRow(entity);
      const columns = Object.keys(row);
      const values = Object.values(row);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

      const query = `
        INSERT INTO ${this.tableName} (${columns.join(', ')})
        VALUES (${placeholders})
        ON CONFLICT (id) DO UPDATE
        SET ${columns.map((col, i) => `${col} = $${i + 1}`).join(', ')}
        RETURNING *
      `;

      const { rows } = await this.pool.query(query, values);
      return Result.ok(this.toEntity(rows[0]));
    } catch (error) {
      return Result.fail(error as Error);
    }
  }

  async delete(id: EntityId): Promise<Result<boolean>> {
    try {
      const { rowCount } = await this.pool.query(
        `DELETE FROM ${this.tableName} WHERE id = $1`,
        [id]
      );
      if (!rowCount) {
        return Result.ok(false);
      }
      return Result.ok(rowCount > 0);
    } catch (error) {
      return Result.fail(error as Error);
    }
  }
}
