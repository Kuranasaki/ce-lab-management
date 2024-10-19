import { useParams } from "react-router-dom";
import TestList from "./components/TestList";
import { useTestList } from "../../hooks/useTestList";
import { Button } from "@ce-lab-mgmt/shared-ui";
import { PlusIcon } from "@radix-ui/react-icons";
import TestListTableItem from "../../domain/entity/TestListTableItem";

export default function ReservationDetailPage() {
    const { id } = useParams();
    const { data: testListdata, setData: setTestListdata, loading: loadingTestListdata } = useTestList({ isFetch: true, id });

    if (!id) {
        return
    }

    if (loadingTestListdata) {
        return <p>Loading...</p>;
    }

    const handleAddTest = () => {
        const newItem = new TestListTableItem("3", "Test 3", "Detail 3", "Note 3", 400, 1, 10, 40);
        setTestListdata(testListdata.addItem(newItem))
    };

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h4>รายการทดสอบ</h4>
                </div>
                <div className="rounded-lg border border-slate-300">
                    <TestList data={testListdata} editable={false} setData={setTestListdata} />
                </div>
            </div>
        </div >
    );
}
