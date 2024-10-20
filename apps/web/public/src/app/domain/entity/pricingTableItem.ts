import { Pricing, Tags } from '@ce-lab-mgmt/api-interfaces';
import { PricingItem } from '../../data/models/Pricing';

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
