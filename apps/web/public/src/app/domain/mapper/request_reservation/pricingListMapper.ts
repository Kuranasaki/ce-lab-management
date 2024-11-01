import { PricingItem } from '@ce-lab-mgmt/api-interfaces';
import {
  CategoryTestList,
  PricingListProps,
  TestItem,
} from '../../entity/request_reservation/pricingListProps';

export default function pricingListMapper(
  data: PricingItem[]
): PricingListProps {
  // const categoryTestList = new PricingListProps({
  //   categoryTestList: new Map<string, CategoryTestList>([
  //     [
  //       '1',
  //       new CategoryTestList({
  //         testItems: new Map<string, TestItem[]>([
  //           [
  //             'Cement test',
  //             [
  //               new TestItem({
  //                 id: '6714b4c54314e4e43a99134c',
  //                 subName: 'Fineness test',
  //                 pricePerUnit: 2000,
  //                 unit: 'ตัวอย่าง',
  //               }),
  //               new TestItem({
  //                 id: '6714b8a842898021fa53acd2',
  //                 subName: 'Cement test',
  //                 pricePerUnit: 3000,
  //                 unit: 'ตัวอย่าง',
  //               }),
  //               new TestItem({
  //                 id: '6714bb8a954669ac0362dfd9',
  //                 subName: 'Compressive strength of mortar test',
  //                 pricePerUnit: 900,
  //                 unit: 'ตัวอย่าง',
  //               }),
  //               new TestItem({
  //                 id: '671540ab26151dbead007a10',
  //                 subName: 'Tensile strength test',
  //                 pricePerUnit: 900,
  //                 unit: 'ตัวอย่าง',
  //               }),
  //             ],
  //           ],
  //         ]),
  //       }),
  //     ],
  //   ]),
  // });
  function mapTests(data: PricingItem[]): PricingListProps {
    const testItemsMap = new Map<string, TestItem[]>();

    data.forEach((test) => {
      const category = test.tags.category || 'Uncategorized';
      const pricingInfo = test.pricing[0]; // Assuming only one pricing entry per test

      const testItem = new TestItem({
        id: test.id,
        subName: test.name,
        pricePerUnit: pricingInfo.price,
        unit: pricingInfo.perUnit.unit,
      });

      if (!testItemsMap.has(category)) {
        testItemsMap.set(category, []);
      }
      testItemsMap.get(category)?.push(testItem);
    });

    return new PricingListProps({
      categoryTestList: new Map<string, CategoryTestList>([
        [
          '1',
          new CategoryTestList({
            testItems: testItemsMap,
          }),
        ],
      ]),
    });
  }
  // console.log(mapTests(data));
  const categoryTestList = mapTests(data);
  return categoryTestList;
}
