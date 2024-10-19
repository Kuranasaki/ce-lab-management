import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import TestListTable from '../domain/entity/TestListTable';
import TestListTableItem from '../domain/entity/TestListTableItem';

export function useTestList({ isFetch, id }: { isFetch: boolean, id?: string }) {
    const [data, setData] = useState<TestListTable>(new TestListTable([],0));
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        // const data = await getReservationTable();
        const mockItems: TestListTableItem[] = [
            new TestListTableItem("1", "Test 1", 300, 1, "อัน", 30, "Detail 1", "Note 1"),
            new TestListTableItem("2", "Test 2", 500, 2, "แท่ง", 25, "Detail",  null),
            new TestListTableItem("2", "Test 2", 500, 2, "แท่ง", 25, null,  "Note 2"),
            new TestListTableItem("3", "Test 3", 1200, 2, "ชิ้น", 25, null, null),
        ];
        
        const totalPrice = mockItems.reduce((total, item) => total + item.price, 0); // Calculate total price based on items
        const data: TestListTable = new TestListTable(mockItems, totalPrice);

        if (Array.isArray(data.items) && data.items.every(item => item instanceof TestListTableItem)) {
            setData(data);
        }

        if (data instanceof ToastEntity) {
            // Show toast using redux?
            console.log((data as ToastEntity).description);
        }

        setLoading(false);
    };

    useEffect(() => {
        console.log("data:", data)
        if (isFetch) {fetchData();}
    }, []);

    return { data, setData, loading };
}
