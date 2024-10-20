import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import { ReservationType, ReservationStatus } from '../../data/models/Reservation';
import ReservationDetailProps from '../../domain/entity/detail_reservation/ReservationDetailProps';
import ReservationDetail from '../../views/detail_reservation/components/ReservationDetail';

export function useReservationDetail(initData?: ReservationDetailProps) {
    const [data, setData] = useState<ReservationDetailProps>(new ReservationDetailProps());
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        // const data = await getReservationTable();

        const data = new ReservationDetailProps("1", new Date(), ReservationType.One, ReservationStatus.Pending);

        if (data instanceof ReservationDetail) {
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
