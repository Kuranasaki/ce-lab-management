import { ValidationError } from './domain.errors'
import { Static, TObject, TProperties, Type } from '@sinclair/typebox'
import { TypeCheck, TypeCompiler } from '@sinclair/typebox/compiler'

export abstract class ValueObject<T extends TProperties> {
  protected abstract getSchema(): TObject<T>
  private validator?: TypeCheck<TObject<T>>

  protected constructor(protected readonly props: Static<TObject<T>>) {
    const schema = this.getSchema()
    if (!schema) {
      throw new Error('Schema must be returned from getSchema()')
    }
    
    this.validator = TypeCompiler.Compile(schema)
    
    if (!this.validator.Check(props)) {
      throw new ValidationError('Invalid value object properties')
    }
    
    Object.freeze(this.props)
  }

  public equals(other: ValueObject<T>): boolean {
    if (!(other instanceof ValueObject)) return false
    return JSON.stringify(this.props) === JSON.stringify(other.props)
  }
}