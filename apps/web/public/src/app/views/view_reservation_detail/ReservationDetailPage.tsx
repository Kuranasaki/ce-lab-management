import { useParams } from 'react-router-dom';
import TestList from './components/TestList';
import ReservationDetail from './components/ReservationDetail';
import { useReservationDetail } from '../../hooks/view_reservation_detail/useReservationDetail';
import CustomerDetail from './components/CustomerDetail';
import { ReservationStatus } from '@ce-lab-mgmt/api-interfaces';

export default function ReservationDetailPage() {
  const { id } = useParams();
  const { customer, reservationDetail, testList, loading } =
    useReservationDetail(id || '');
  if (!id) {
    return;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h4>ข้อมูลผู้ขอรับบริการทดสอบ</h4>
        <CustomerDetail data={customer} />
      </div>
      <div className="flex flex-col gap-4">
        <h4>ข้อมูลคำขอรับบริการทดสอบ</h4>
        <ReservationDetail data={reservationDetail} />
        {reservationDetail.status === ReservationStatus.Pending ? (
          <p className="text-error-500">
            *กรุณาติดต่อหน่วยทดสอบวัสดุ เพื่อจ่ายเงินและส่งมอบของ
          </p>
        ) : (
          ''
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h4>รายการทดสอบ</h4>
        <TestList data={testList} />
      </div>
    </div>
  );
}
