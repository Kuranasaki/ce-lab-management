import { useTestList } from "../../hooks/useTestList";
import { Button } from "@ce-lab-mgmt/shared-ui";
import { PlusIcon } from "@radix-ui/react-icons";
import TestListTableItem from "../../domain/entity/TestListTableItem";
import TestListTable from "../../domain/entity/TestListTable";
import { useEffect } from "react";
import TestList from "../detail_reservation/components/TestList";

export default function ExampleEditableTable() {

    const mockItems: TestListTableItem[] = [
        new TestListTableItem("1", "Test 1", 300, 1, "อัน", 30, "Detail 1", "Note 1"),
        new TestListTableItem("2", "Test 2", 500, 2, "แท่ง", 25, "Detail", null),
        new TestListTableItem("2", "Test 2", 500, 2, "แท่ง", 25, null, "Note 2"),
        new TestListTableItem("3", "Test 3", 1200, 2, "ชิ้น", 25, null, null),
    ];
    const totalPrice = mockItems.reduce((total, item) => total + item.price * item.amount, 0); // Calculate total price based on items

    const mockdata: TestListTable = new TestListTable(mockItems, totalPrice);

    const { data: testListdata, setData: setTestListdata } = useTestList({ initData: mockdata });

    const handleAddTest = () => {
        const newItem = new TestListTableItem("99", "Test 3", 1200, 2, "ชิ้น", 25, null, null);
        setTestListdata(testListdata.addItem(newItem))
    };

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h4>รายการทดสอบ</h4>
                    <Button onClick={handleAddTest}><PlusIcon />เพิ่ม</Button>
                </div>
                <div className="rounded-lg border border-slate-300">
                    <TestList data={testListdata} editable={true} setData={setTestListdata} />
                </div>
            </div>
        </div >
    );
}
