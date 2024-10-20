import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import PricingTableItem from '../domain/entity/pricingTableItem';
import getPricingTable from '../domain/usecase/getPricingTable';
import {
  PricingGroup,
  PricingApiResponse,
  SubTest,
  Test,
} from '../data/models/Pricing';

export function usePricingTable() {
  const [data, setData] = useState<PricingTableItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [transformedData, setTransformedData] = useState<PricingGroup[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const data = await getPricingTable();
    if (
      Array.isArray(data) &&
      data.every((item) => item instanceof PricingTableItem)
    ) {
      setData(data);
    }

    if (data instanceof ToastEntity) {
      // Show toast using redux?
      console.log((data as ToastEntity).description);
    }

    setLoading(false);
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const td = transformApiResponse(data);
      setTransformedData(td);
    }
  }, [data]);

  return { data, transformedData, loading };
}
