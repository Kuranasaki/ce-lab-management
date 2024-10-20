import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import CustomerDetailProps from '../domain/entity/CustomerDetailProps';

export function useCustomerDetail(initData?: CustomerDetailProps) {
    const [data, setData] = useState<CustomerDetailProps>(new CustomerDetailProps());
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        // const data = await getReservationTable();

        const data = new CustomerDetailProps(
            "1",                        // orgName
            "Test Project",             // orgProjectName
            "123 Example St, City",     // orgAddress
            "test@example.com",         // orgEmail
            "1234567890",              // orgPhone
            "123-456-7890"             // orgFax
        );

        if (data instanceof CustomerDetailProps) {
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
            setData(initData)
        } else {
            fetchData();
        }
    }, []);

    return { data, loading };
}
