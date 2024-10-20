import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import TestListTableProps from '../../domain/entity/view_reservation_detail/TestListTableProps';
import TestListTableItemProps from '../../domain/entity/view_reservation_detail/TestListTableItemProps';

export function useTestList({
  initData,
  id,
}: {
  initData?: TestListTableProps;
  id?: string;
}) {
  const [data, setData] = useState<TestListTableProps>(
    new TestListTableProps()
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    // const data = await getReservationTable();
    const mockItems: TestListTableItemProps[] = [
      new TestListTableItemProps(
        '1',
        'Test 1',
        300,
        1,
        'อัน',
        30,
        'Detail 1',
        'Note 1'
      ),
      new TestListTableItemProps(
        '2',
        'Test 2',
        500,
        2,
        'แท่ง',
        25,
        'Detail',
        null
      ),
      new TestListTableItemProps(
        '2',
        'Test 2',
        500,
        2,
        'แท่ง',
        25,
        null,
        'Note 2'
      ),
      new TestListTableItemProps(
        '3',
        'Test 3',
        1200,
        2,
        'ชิ้น',
        25,
        null,
        null
      ),
    ];

    const totalPrice = mockItems.reduce((total, item) => total + item.price, 0); // Calculate total price based on items
    const data: TestListTableProps = new TestListTableProps(
      mockItems,
      totalPrice
    );

    if (
      Array.isArray(data.items) &&
      data.items.every((item) => item instanceof TestListTableItemProps)
    ) {
      setData(data);
    }

    if (data instanceof ToastEntity) {
      // Show toast using redux?
      console.log((data as ToastEntity).description);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (initData) {
      setData(initData);
    } else {
      fetchData();
    }
  }, []);

  return { data, setData, loading };
}
