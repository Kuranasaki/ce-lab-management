import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import {
  ReservationType,
  ReservationStatus,
} from '../../data/models/Reservation';
import ReservationDetailProps from '../../domain/entity/view_reservation_detail/ReservationDetailProps';
import ReservationDetail from '../../views/view_reservation_detail/components/ReservationDetail';

export function useReservationDetail(initData?: ReservationDetailProps) {
  const [data, setData] = useState<ReservationDetailProps>(
    new ReservationDetailProps({})
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    // const data = await getReservationTable();

    const data = new ReservationDetailProps({
      id: '1',
      date: new Date(),
      type: ReservationType.One,
      status: ReservationStatus.Pending,
    });

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
      setData(initData);
    } else {
      fetchData();
    }
  }, []);

  return { data, loading };
}
