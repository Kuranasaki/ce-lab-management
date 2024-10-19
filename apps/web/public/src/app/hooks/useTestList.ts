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
            new TestListTableItem("1","Test 1", "Detail 1", "Note 1", 300, 1, 10, 30),
            new TestListTableItem("2","Test 2", "Detail 2", "Note 2", 500, 2, 20, 25),
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
