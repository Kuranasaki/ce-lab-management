import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import ReservationTableItem from '../domain/entity/reservationTableItem';

export function useReservationTable() {
    const [data, setData] = useState<ReservationTableItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        // const data = await exampleUseCase();
        const data: ReservationTableItem[] = [
            new ReservationTableItem("m5gr84i8", new Date(), "one", "pending", 3000),
            new ReservationTableItem("k4gr74f2", new Date(), "two", "success", 4500),
            new ReservationTableItem("j2gr92d1", new Date(), "three", "canceled", 2000),
        ];
        
        if (Array.isArray(data) && data.every(item => item instanceof ReservationTableItem)) {
            setData(data);
        }         

        if (data instanceof ToastEntity) {
            // Show toast using redux?
            console.log((data as ToastEntity).description);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading };
}
