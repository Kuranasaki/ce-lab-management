import { Guard } from "@ce-lab-mgmt/core-utils";
import { BasePricingProps, BasePricing } from "./base-pricing.vo";

interface PerUnitPricingProps extends BasePricingProps {
  unitType: 'piece' | 'weight' | 'length';
  unitPrice: number;
  minimumUnits?: number;
}

export class PerUnitPricing extends BasePricing {
  protected readonly props: PerUnitPricingProps;

  private constructor(props: PerUnitPricingProps) {
    super(props);
    this.props = props;
  }
  static create(props: PerUnitPricingProps): PerUnitPricing {
    Guard.againstNullOrUndefined(props.unitPrice, 'unit price');
    Guard.againstNegative(props.unitPrice, 'unit price');
    Guard.againstNullOrUndefined(props.unitType, 'unit type');
    
    if (props.minimumUnits) {
      Guard.againstNegative(props.minimumUnits, 'minimum units');
    }

    return new PerUnitPricing(props);
  }

  get unitType(): string {
    return this.props.unitType;
  }

  get unitPrice(): number {
    return this.props.unitPrice;
  }

  get minimumUnits(): number | undefined {
    return this.props.minimumUnits;
  }

  calculatePrice(params: { units: number }): number {
    const { units } = params;
    Guard.againstNegative(units, 'units');

    const effectiveUnits = this.minimumUnits 
      ? Math.max(units, this.minimumUnits)
      : units;

    return this.basePrice + (effectiveUnits * this.unitPrice);
  }
}
