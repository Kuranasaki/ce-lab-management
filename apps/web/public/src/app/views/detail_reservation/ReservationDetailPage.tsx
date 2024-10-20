import { useParams } from "react-router-dom";
import TestList from "./components/TestList";
import { useTestList } from "../../hooks/useTestList";
import ReservationDetail from "./components/ReservationDetail";
import { useReservationDetail } from "../../hooks/useReservationDetail";
import { useCustomerDetail } from "../../hooks/useCustomerDetail";
import CustomerDetail from "./components/CustomerDetail";

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
                <div className="flex justify-between items-center">
                    <h4>ข้อมูลผู้ขอรับบริการทดสอบ</h4>
                </div>
                <CustomerDetail data={customerDetail} />
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h4>ข้อมูลคำขอรับบริการทดสอบ</h4>
                </div>
                <ReservationDetail data={reservationDetail} />
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h4>รายการทดสอบ</h4>
                </div>
                <div className="rounded-lg border border-slate-300">
                    <TestList data={testListData} editable={false} setData={setTestListdata} />
                </div>
            </div>
        </div >
    );
}
