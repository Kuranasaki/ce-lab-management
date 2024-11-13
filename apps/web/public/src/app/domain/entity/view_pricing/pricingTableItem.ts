import { Pricing, Tags } from '@ce-lab-mgmt/api-interfaces';
import { PricingItem } from '@ce-lab-mgmt/api-interfaces';

export interface Price {
  price: number;
  unit: string;
  amount: number;
}

export interface Test {
  test_name: string;
  sub_tests?: SubTest[]; // Optional array for sub-tests
  note?: string;
  prices?: Price[];
}

export interface SubTest {
  sub_test_name: string;
  note?: string;
  prices?: Price[];
}

export interface PricingGroup {
  category: string; // Name of the category
  note?: string; // Optional note for the category
  tests: Test[]; // Array of tests for this category
}

export interface PricingType {
  type: string;
  categories: PricingGroup[];
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
