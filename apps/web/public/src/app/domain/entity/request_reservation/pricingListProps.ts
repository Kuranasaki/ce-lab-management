export class PricingListProps {
  categoryTestList: Map<string, CategoryTestList>;
  // ทดสอบวัสดุ -> {}

  constructor({
    categoryTestList,
  }: {
    categoryTestList: Map<string, CategoryTestList>;
  }) {
    this.categoryTestList = categoryTestList;
  }
}

export class CategoryTestList {
  testItems: Map<string, TestItem[]>;
  // 1. Concrete Mix -> [6, 9, 12, ...]

  constructor({ testItems }: { testItems: Map<string, TestItem[]> }) {
    this.testItems = testItems;
  }
}

export class TestItem {
  id: string;
  subName: string;
  prices: { price: number; unit: string; amount: number }[];

  constructor({
    id,
    subName,
    prices,
  }: {
    id: string;
    subName: string;
    prices: { price: number; unit: string; amount: number }[];
  }) {
    this.id = id;
    this.subName = subName;
    this.prices = prices;
  }
}
