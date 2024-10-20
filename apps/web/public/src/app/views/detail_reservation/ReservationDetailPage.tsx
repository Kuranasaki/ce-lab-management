import { useParams } from "react-router-dom";
import TestList from "./components/TestList";
import { useTestList } from "../../hooks/detail_reservation/useTestList";
import ReservationDetail from "./components/ReservationDetail";
import { useReservationDetail } from "../../hooks/detail_reservation/useReservationDetail";
import { useCustomerDetail } from "../../hooks/detail_reservation/useCustomerDetail";
import CustomerDetail from "./components/CustomerDetail";
import { ReservationStatus } from "../../data/models/Reservation";

export default function ReservationDetailPage() {
    const { id } = useParams();
    const { data: testListData, setData: setTestListdata, loading: loadingTestListdata } = useTestList({ id });
    const { data: reservationDetail, loading: loadingReservationDetail } = useReservationDetail();
    const { data: customerDetail, loading: loadingCustomerDetail } = useCustomerDetail();

    if (!id) {
        return
    }

    if (loadingTestListdata || loadingReservationDetail || loadingCustomerDetail) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h4>ข้อมูลผู้ขอรับบริการทดสอบ</h4>
                <CustomerDetail data={customerDetail} />
            </div>
            <div className="flex flex-col gap-4">
                <h4>ข้อมูลคำขอรับบริการทดสอบ</h4>
                <ReservationDetail data={reservationDetail} />
                {
                    reservationDetail.status == ReservationStatus.Pending
                        ? <p className="text-error-500">*กรุณาติดต่อหน่วยทดสอบวัสดุ เพื่อจ่ายเงินและส่งมอบของ</p>
                        : ""
                }
            </div>
            <div className="flex flex-col gap-4">
                <h4>รายการทดสอบ</h4>
                <TestList data={testListData} editable={false} setData={setTestListdata} />
            </div>
        </div >
    );
}
