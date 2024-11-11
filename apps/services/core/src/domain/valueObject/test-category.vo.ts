import { ValueObject } from '@ce-lab-mgmt/domain';
import { Guard } from '@ce-lab-mgmt/core-utils';

interface TestCategoryProps extends Record<string, unknown>  {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  level: number;
}

export class TestCategory extends ValueObject<TestCategoryProps> {
  public static create(props: TestCategoryProps): TestCategory {
    Guard.againstNullOrUndefined(props.name, 'category name');
    Guard.againstEmpty(props.name, 'category name');
    Guard.againstNullOrUndefined(props.level, 'category level');
    Guard.againstNegative(props.level, 'category level');

    return new TestCategory(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get parentId(): string | undefined {
    return this.props.parentId;
  }

  get level(): number {
    return this.props.level;
  }

  isRoot(): boolean {
    return !this.props.parentId;
  }
}
