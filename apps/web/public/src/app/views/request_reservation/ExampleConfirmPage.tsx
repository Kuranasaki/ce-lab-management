import { ReservationType, ReservationStatus } from "../../data/models/Reservation";
import CustomerDetailProps from "../../domain/entity/detail_reservation/CustomerDetailProps";
import ReservationDetailProps from "../../domain/entity/detail_reservation/ReservationDetailProps";
import TestListTable from "../../domain/entity/detail_reservation/TestListTable";
import TestListTableItem from "../../domain/entity/detail_reservation/TestListTableItem";
import { useCustomerDetail } from "../../hooks/detail_reservation/useCustomerDetail";
import { useReservationDetail } from "../../hooks/detail_reservation/useReservationDetail";
import { useTestList } from "../../hooks/detail_reservation/useTestList";
import CustomerDetail from "../detail_reservation/components/CustomerDetail";
import ReservationDetail from "../detail_reservation/components/ReservationDetail";
import TestList from "../detail_reservation/components/TestList";


export default function ExampleConfirmPage() {

    const mockReservationDetail = new ReservationDetailProps(null, new Date(), ReservationType.One, null);

    const mockItems: TestListTableItem[] = [
        new TestListTableItem("1", "Test 1", 300, 1, "อัน", 30, "Detail 1", "Note 1"),
        new TestListTableItem("2", "Test 2", 500, 2, "แท่ง", 25, "Detail", null),
        new TestListTableItem("2", "Test 2", 500, 2, "แท่ง", 25, null, "Note 2"),
        new TestListTableItem("3", "Test 3", 1200, 2, "ชิ้น", 25, null, null),
    ];
    const totalPrice = mockItems.reduce((total, item) => total + item.price * item.amount, 0);
    const mockTestList: TestListTable = new TestListTable(mockItems, totalPrice);
    const mockCustomer = new CustomerDetailProps(
        "1",                        // orgName
        "Test Project",             // orgProjectName
        "123 Example St, City",     // orgAddress
        "test@example.com",         // orgEmail
        "1234567890",              // orgPhone
        "123-456-7890"             // orgFax
    );

    const { data: testListData } = useTestList({ initData: mockTestList });
    const { data: reservationDetail } = useReservationDetail(mockReservationDetail);
    const { data: customerDetail } = useCustomerDetail(mockCustomer);

    return (
        <div className="flex flex-col gap-8">
            <div>(1)---(2)---(3)</div>
            <div className="flex flex-col gap-4">
                <h4>ข้อมูลผู้ขอรับบริการทดสอบ</h4>
                <CustomerDetail data={customerDetail} />
            </div>
            <div className="flex flex-col gap-4">
                <h4>ข้อมูลคำขอรับบริการทดสอบ</h4>
                <ReservationDetail data={reservationDetail} />
            </div>
            <div className="flex flex-col gap-4">
                <h4>รายการทดสอบ</h4>
                <TestList data={testListData} />
            </div>
            <div>[ย้อนกลับ] [ส่งคำขอบริการ]</div>
        </div >
    );
}
