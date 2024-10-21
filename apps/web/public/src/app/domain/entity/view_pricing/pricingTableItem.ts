import { Pricing, Tags } from '@ce-lab-mgmt/api-interfaces';
import { PricingItem } from '@ce-lab-mgmt/api-interfaces';

export interface Test {
  test_name: string;
  price?: number; // Price can be optional
  amount?: number; // Amount can be optional
  unit?: string; // Unit can be optional
  sub_tests?: SubTest[]; // Optional array for sub-tests
  note?: string;
}

export interface SubTest {
  sub_test_name: string;
  price?: number; // Price can be optional
  amount?: number; // Amount can be optional
  unit?: string; // Unit can be optional
}

export interface PricingGroup {
  category: string; // Name of the category
  note?: string; // Optional note for the category
  tests: Test[]; // Array of tests for this category
}

export default class PricingTableItem implements PricingItem {
  description: string;
  id: string;
  name: string;
  pricing: Pricing[];
  tags: Tags;

  constructor(
    description: string,
    id: string,
    name: string,
    pricing: Pricing[],
    tags: Tags
  ) {
    this.description = description;
    this.id = id;
    this.name = name;
    this.pricing = pricing;
    this.tags = tags;
  }
}
