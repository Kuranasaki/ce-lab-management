import { EntityId } from "./base-type";

export abstract class Entity<T extends EntityId = EntityId> {
  protected constructor(protected readonly _id: T) {}

  get id(): T {
    return this._id;
  }

  equals(other: Entity<T>): boolean {
    if (!(other instanceof Entity)) return false;
    return this._id === other._id;
  }
}
