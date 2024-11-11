import { Guard } from "@ce-lab-mgmt/core-utils";
import { BasePricing, BasePricingProps } from "./base-pricing.vo";

interface PriceRange {
  min: number;
  max?: number;
  price: number;
}

interface RangePricingProps extends BasePricingProps {
  ranges: PriceRange[];
}

export class RangePricing extends BasePricing {
  protected readonly props: RangePricingProps;
  private constructor(props: RangePricingProps) {
    super(props);
    this.props = props;
  }
  
  static create(props: RangePricingProps): RangePricing {
    Guard.againstNullOrUndefined(props.ranges, 'ranges');
    if (props.ranges.length === 0) {
      throw new Error('At least one range must be defined');
    }

    // Validate ranges
    props.ranges.forEach((range, index) => {
      Guard.againstNegative(range.min, `range ${index} min`);
      Guard.againstNegative(range.price, `range ${index} price`);
      if (range.max !== undefined) {
        Guard.againstNegative(range.max, `range ${index} max`);
        if (range.max <= range.min) {
          throw new Error(`Range ${index} max must be greater than min`);
        }
      }
    });

    return new RangePricing(props);
  }

  get ranges(): PriceRange[] {
    return [...this.props.ranges];
  }

  calculatePrice(params: { value: number }): number {
    const { value } = params;
    Guard.againstNegative(value, 'value');

    const applicableRange = this.props.ranges.find(range => 
      value >= range.min && (!range.max || value <= range.max)
    );

    if (!applicableRange) {
      throw new Error('No applicable price range found');
    }

    return this.basePrice + applicableRange.price;
  }
}