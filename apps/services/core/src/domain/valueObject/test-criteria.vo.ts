import { Guard } from "@ce-lab-mgmt/core-utils";
import { ValueObject } from "@ce-lab-mgmt/domain";

interface TestCriteriaProps extends Record<string, unknown> {
  name: string;
  expectedValue: any;
  tolerance?: {
    min?: number;
    max?: number;
  };
  unit?: string;
}

export class TestCriteria extends ValueObject<TestCriteriaProps> {
  static create(props: TestCriteriaProps): TestCriteria {
    Guard.againstNullOrUndefined(props.name, 'criteria name');
    Guard.againstEmpty(props.name, 'criteria name');
    Guard.againstNullOrUndefined(props.expectedValue, 'expected value');

    if (props.tolerance) {
      if (props.tolerance.min !== undefined) {
        Guard.againstNegative(props.tolerance.min, 'tolerance min');
      }
      if (props.tolerance.max !== undefined) {
        Guard.againstNegative(props.tolerance.max, 'tolerance max');
      }
    }

    return new TestCriteria(props);
  }

  get name(): string {
    return this.props.name;
  }

  get expectedValue(): any {
    return this.props.expectedValue;
  }

  get tolerance(): { min?: number; max?: number } | undefined {
    return this.props.tolerance;
  }

  get unit(): string | undefined {
    return this.props.unit;
  }

  isWithinTolerance(actualValue: number): boolean {
    if (!this.props.tolerance) return actualValue === this.expectedValue;

    const { min = 0, max = 0 } = this.props.tolerance;
    return actualValue >= (this.expectedValue - min) && 
           actualValue <= (this.expectedValue + max);
  }
}