import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import ReservationTableItemProps from '../../domain/entity/view_reservation/reservationTableItemProps';
import getReservationTable from '../../domain/usecase/view_reservation/getReservationTable';

export function useReservationTable() {
  const [data, setData] = useState<ReservationTableItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await getReservationTable();

    if (
      Array.isArray(data) &&
      data.every((item) => item instanceof ReservationTableItemProps)
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
    fetchData();
  }, []);

  return { data, loading };
}
