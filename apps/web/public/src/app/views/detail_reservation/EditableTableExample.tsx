import { useParams } from "react-router-dom";
import TestList from "./components/TestList";
import { useTestList } from "../../hooks/useTestList";
import { Button } from "@ce-lab-mgmt/shared-ui";
import { PlusIcon } from "@radix-ui/react-icons";
import TestListTableItem from "../../domain/entity/TestListTableItem";
import TestListTable from "../../domain/entity/TestListTable";
import { useEffect } from "react";

export default function EditableTableExample() {
    const { data: testListdata, setData: setTestListdata, loading: loadingTestListdata } = useTestList({ isFetch: false });

    if (loadingTestListdata) {
        return <p>Loading...</p>;
    }

    const handleAddTest = () => {
        const newItem = new TestListTableItem("3", "Test 3", "Detail 3", "Note 3", 400, 1, 10, 40);
        setTestListdata(testListdata.addItem(newItem))
    };

    useEffect(() => {
        const mockItems: TestListTableItem[] = [
            new TestListTableItem("1", "Test 1", "Detail 1", "Note 1", 300, 1, 10, 30),
            new TestListTableItem("2", "Test 2", "Detail 2", "Note 2", 500, 2, 20, 25),
        ];
        const totalPrice = mockItems.reduce((total, item) => total + item.price, 0); // Calculate total price based on items
        
        const mockdata: TestListTable = new TestListTable(mockItems, totalPrice);

        setTestListdata(mockdata);
    }, []); 


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
