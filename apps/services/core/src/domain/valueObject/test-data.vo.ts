import { Guard } from "@ce-lab-mgmt/core-utils";
import { ValueObject } from "@ce-lab-mgmt/domain";

interface TestDataProps extends Record<string, unknown> {
  parameters: Record<string, any>;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export class TestData extends ValueObject<TestDataProps> {
  static create(props: TestDataProps): TestData {
    Guard.againstNullOrUndefined(props.parameters, 'parameters');
    Guard.againstNullOrUndefined(props.timestamp, 'timestamp');

    return new TestData(props);
  }

  get parameters(): Record<string, any> {
    return { ...this.props.parameters };
  }

  get metadata(): Record<string, any> | undefined {
    return this.props.metadata ? { ...this.props.metadata } : undefined;
  }

  get timestamp(): Date {
    return new Date(this.props.timestamp);
  }
}