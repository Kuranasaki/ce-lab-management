import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import PricingTableItem from '../entity/pricingTableItem';
import { BaseResponse, PricingItem } from '@ce-lab-mgmt/api-interfaces';
import { PricingGroup, SubTest, Test } from '../../data/models/Pricing';

export default async function mapper(
  rawData: BaseResponse<PricingItem[]>
): Promise<PricingGroup[] | ToastEntity> {
  if (!rawData) {
    return [];
  }
  if (rawData.error) {
    return ToastEntity.fromCode(rawData.error.code);
  }

  if (!rawData.data) {
    return ToastEntity.unknownError();
  }

  const groupedData: PricingTableItem[] = rawData.data.map((priceItem) => {
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
  ): PricingGroup[] => {
    const groupedData: { [category: string]: PricingGroup } = {};

    response.forEach((priceItem, idx) => {
      const category = priceItem.tags?.category?.[0];
      const testName = priceItem.tags?.subcategory?.[0] || null; // Use subcategory as the test name if it exists
      const pricingInfo = priceItem.pricing?.[0] || {};
      const price = pricingInfo.price || 0;
      const unit = pricingInfo.perUnit?.unit || '';
      const amount = pricingInfo.perUnit?.quantity || 0;

      // Initialize the category group if not already present
      if (!groupedData[category]) {
        groupedData[category] = {
          category: category,
          tests: [],
        };
      }

      // Create the test item using the subcategory as the test name
      let isAddTest = false;
      let test = groupedData[category].tests.find(
        (t) => t.test_name === testName
      );

      if (!test) {
        isAddTest = true;
        test = {
          test_name: testName || priceItem.name,
          price: price,
          amount: amount,
          unit: unit,
          note: priceItem.description || '',
        } as Test;
      }

      let subTest: SubTest | null = null;
      if (priceItem.tags.subcategory.length > 0) {
        subTest = {
          sub_test_name: priceItem.name,
          price: price,
          amount: amount,
          unit: unit,
        } as SubTest;
      }

      // Add the test to the corresponding category
      if (subTest) {
        test.sub_tests = test.sub_tests || [];
        test.sub_tests.push(subTest);
        if (isAddTest) {
          groupedData[category].tests.push(test);
        } else {
          const existingTestIndex = groupedData[category].tests.findIndex(
            (t) => t.test_name === testName
          );
          if (existingTestIndex !== -1) {
            groupedData[category].tests[existingTestIndex] = test;
          }
        }
      } else {
        groupedData[category].tests.push(test);
      }
    });

    // Convert the grouped data to an array of PricingGroup
    return Object.values(groupedData);
  };

  const transformedData = transformApiResponse(groupedData);

  return transformedData;
}
