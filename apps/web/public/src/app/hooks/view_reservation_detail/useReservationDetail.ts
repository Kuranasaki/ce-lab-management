import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import ReservationDetailProps from '../../domain/entity/view_reservation_detail/ReservationDetailProps';
import getReservationDetail from '../../domain/usecase/view_reservation_detail/getReservationDetail';
import CustomerDetailProps from '../../domain/entity/view_reservation_detail/CustomerDetailProps';
import TestListTableProps from '../../domain/entity/view_reservation_detail/TestListTableProps';

export function useReservationDetail(id: string) {
  const [customer, setCustomer] = useState<CustomerDetailProps>(new CustomerDetailProps());
  const [reservationDetail, setReservationDetail] = useState<ReservationDetailProps>(new ReservationDetailProps({}));
  const [testList, setTestList] = useState<TestListTableProps>(new TestListTableProps());

  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await getReservationDetail(id);

    if (data instanceof ToastEntity) {
      console.log(data.description);
    } else {
      // Set the state variables with the fetched data
      if (data.customer instanceof CustomerDetailProps) {
        setCustomer(data.customer);
      }
      if (data.reservationDetail instanceof ReservationDetailProps) {
        setReservationDetail(data.reservationDetail);
      }
      if (data.testList instanceof TestListTableProps) {
        setTestList(data.testList);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { customer, reservationDetail, testList, loading };
}
