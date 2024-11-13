import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import PricingTableItem from '../../entity/view_pricing/pricingTableItem';
import { BaseResponse, PricingItem } from '@ce-lab-mgmt/api-interfaces';
import {
  PricingGroup,
  SubTest,
  Test,
  PricingType,
} from '../../entity/view_pricing/pricingTableItem';

export default async function mapper(
  rawData: BaseResponse<PricingItem[]>
): Promise<PricingType[] | ToastEntity> {
  if (!rawData) {
    return [];
  }
  if (rawData.error) {
    return ToastEntity.fromCode(rawData.error.code ?? 500);
  }

  if (!rawData.data) {
    return ToastEntity.unknownError();
  }

  const pricingItems: PricingTableItem[] = rawData.data.map((priceItem) => {
    return new PricingTableItem(
      priceItem.description,
      priceItem.id,
      priceItem.name,
      priceItem.pricing,
      priceItem.tags
    );
  });

  const transformApiResponse = (
    response: PricingTableItem[]
  ): PricingType[] => {
    const groupedData: {
      [type: string]: { [category: string]: PricingGroup };
    } = {};

    response.forEach((priceItem) => {
      const type = priceItem.tags?.type;
      const category = priceItem.tags?.category || 'Uncategorized';
      const subcategory = priceItem.tags?.subcategory;
      const testName = subcategory || priceItem.name; // Use subcategory as test name if available

      const pricingInfo = priceItem.pricing;

      // Initialize type and category groups if they don't already exist
      if (!groupedData[type]) groupedData[type] = {};
      if (!groupedData[type][category]) {
        groupedData[type][category] = {
          category: category,
          tests: [],
        };
      }

      const categoryGroup = groupedData[type][category];
      let test = categoryGroup.tests.find((t) => t.test_name === testName);

      // Add new test if it doesn’t exist
      if (!test) {
        test = {
          test_name: testName,
          note: priceItem.description || '',
        } as Test;
        categoryGroup.tests.push(test);
      }

      // Add sub-test if subcategory exists
      if (subcategory) {
        const subTest: SubTest = {
          sub_test_name: priceItem.name,
          note: priceItem.description,
          prices: pricingInfo.map((price) => {
            return {
              price: price.price,
              unit: price.perUnit.unit,
              amount: price.perUnit.quantity,
            };
          }),
        };
        test.sub_tests = test.sub_tests || [];
        test.sub_tests.push(subTest);
      } else {
        test.prices = pricingInfo.map((price) => {
          return {
            price: price.price,
            unit: price.perUnit.unit,
            amount: price.perUnit.quantity,
          };
        });
      }
    });

    const transformed = Object.keys(groupedData).map((type) => {
      const categories: PricingGroup[] = Object.keys(groupedData[type]).map(
        (category) => {
          const group = groupedData[type][category];
          return {
            category,
            note: group.note,
            tests: group.tests.map((test) => ({
              test_name: test.test_name,
              prices: test.prices,
              sub_tests: test.sub_tests?.map((subTest) => ({
                sub_test_name: subTest.sub_test_name,
                prices: subTest.prices,
              })),
              note: test.note,
            })),
          };
        }
      );

      return {
        type,
        categories,
      };
    });

    // Convert the grouped data to an array of PricingGroup
    return transformed;
  };

  const transformedData = transformApiResponse(pricingItems);

  return transformedData;
}
