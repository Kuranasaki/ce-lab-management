import { PricingItem } from '@ce-lab-mgmt/api-interfaces';
import {
  CategoryTestList,
  PricingListProps,
  TestItem,
} from '../../entity/request_reservation/pricingListProps';

export default function pricingListMapper(
  data: PricingItem[]
): PricingListProps {
  function mapTests(data: PricingItem[]): PricingListProps {
    const testItemsMap = [
      new Map<string, TestItem[]>(),
      new Map<string, TestItem[]>(),
      new Map<string, TestItem[]>(),
    ] as Map<string, TestItem[]>[];

    data.forEach((test) => {
      const indexType =
        test.tags.type === 'ทดสอบวัสดุ'
          ? 0
          : test.tags.type === 'ทดสอบเทียบ'
          ? 1
          : 2;
      const category = test.tags.category || 'อื่น ๆ';
      const pricingInfo = test.pricing;

      const testItem = new TestItem({
        id: test.id,
        subName: test.name,
        prices: pricingInfo.map((price) => ({
          price: price.price,
          unit: price.perUnit.unit,
          amount: price.perUnit.quantity,
        })),
      });

      if (!testItemsMap[indexType].has(category)) {
        testItemsMap[indexType].set(category, []);
      }
      testItemsMap[indexType].get(category)?.push(testItem);
    });

    return new PricingListProps({
      categoryTestList: new Map<string, CategoryTestList>(
        testItemsMap
          .map(
            (testItems, idx) =>
              [(idx + 1).toString(), new CategoryTestList({ testItems })] as [
                string,
                CategoryTestList
              ]
          )
          .filter((testItem) => testItem[1].testItems.size > 0)
      ),
    });
  }
  const categoryTestList = mapTests(data);
  return categoryTestList;
}
