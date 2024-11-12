import { MongoRepository } from '@ce-lab-mgmt/infrastructure'
import { Result } from '@ce-lab-mgmt/domain'
import { ExperimentItem } from '../aggregates/item.aggregate'
import { MongoPricingItem } from './schemas/pricing-item.schema'
import { ObjectId } from 'mongodb'
import { TExperimentItem } from '@ce-lab-mgmt/api-interfaces'

export class ExperimentItemRepository extends MongoRepository<TExperimentItem> {
  constructor() {
    super('pricingItems')
  }

  protected toDomain(doc: MongoPricingItem): TExperimentItem {
    return ExperimentItem.reconstitute({
      id: doc._id,
      name: doc.name,
      tags: doc.tags,
      pricing: doc.pricing,
      description: doc.description
    }).value
  }

  protected toPersistence(entity: ExperimentItem): Omit<MongoPricingItem, '_id'> {
    const primitives = entity.toPrimitives()
    return {
      name: primitives.name,
      tags: primitives.tags,
      pricing: primitives.pricing,
      description: primitives.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }

  async findByCategory(category: string): Promise<Result<PricingItem[]>> {
    try {
      const docs = await this.collection
        .find({ 'tags.category': category })
        .toArray()
      
      return Result.ok(docs.map(doc => this.toDomain(doc as MongoPricingItem)))
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  async findByType(type: string): Promise<Result<PricingItem[]>> {
    try {
      const docs = await this.collection
        .find({ 'tags.type': type })
        .toArray()
      
      return Result.ok(docs.map(doc => this.toDomain(doc as MongoPricingItem)))
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  async findWithPriceRange(min: number, max: number): Promise<Result<PricingItem[]>> {
    try {
      const docs = await this.collection
        .find({
          'pricing.price': {
            $gte: min,
            $lte: max
          }
        })
        .toArray()
      
      return Result.ok(docs.map(doc => this.toDomain(doc as MongoPricingItem)))
    } catch (error) {
      return Result.fail(error as Error)
    }
  }

  async search(query: string): Promise<Result<PricingItem[]>> {
    try {
      const docs = await this.collection
        .find({
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ]
        })
        .toArray()
      
      return Result.ok(docs.map(doc => this.toDomain(doc as MongoPricingItem)))
    } catch (error) {
      return Result.fail(error as Error)
    }
  }
}
