import { Guard } from "@ce-lab-mgmt/core-utils";
import { ValueObject } from "@ce-lab-mgmt/domain";


export interface BasePricingProps {
  id: string;
  testId: string;
  basePrice: number;
  currency: string;
}

export abstract class BasePricing extends ValueObject<BasePricingProps> {
  protected constructor(props: BasePricingProps) {
    Guard.againstNullOrUndefined(props.basePrice, 'base price');
    Guard.againstNegative(props.basePrice, 'base price');
    Guard.againstNullOrUndefined(props.currency, 'currency');
    Guard.againstEmpty(props.currency, 'currency');
    
    super(props);
  }

  abstract calculatePrice(params: Record<string, any>): number;

  get id(): string {
    return this.props.id;
  }

  get testId(): string {
    return this.props.testId;
  }

  get basePrice(): number {
    return this.props.basePrice;
  }

  get currency(): string {
    return this.props.currency;
  }
}