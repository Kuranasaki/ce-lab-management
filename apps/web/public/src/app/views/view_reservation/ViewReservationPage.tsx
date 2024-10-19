import { Button, Tabs, TabsList, TabsTrigger } from "@ce-lab-mgmt/shared-ui";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReservationTable from "./components/ReservationTable";

export default function ViewReservationPage() {
    const [activeTab, setActiveTab] = useState<string>('');

    return (
        <div className="flex flex-col gap-6">
            <Tabs
                defaultValue=""
                onValueChange={(value) => setActiveTab(value)}
                className="w-full flex flex-col gap-6"
            >                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="">ทั้งหมด</TabsTrigger>
                        <TabsTrigger value="pending">รออนุมัติ</TabsTrigger>
                        <TabsTrigger value="processing">กำลังทดสอบ</TabsTrigger>
                        <TabsTrigger value="success">สำเร็จ</TabsTrigger>
                        <TabsTrigger value="canceled">ยกเลิก</TabsTrigger>
                    </TabsList>
                    <Link to="/reservation/request">
                        <Button variant="default" size="sm"><PlusIcon />สร้างคำขอ</Button>
                    </Link>
                </div>
                <div className="rounded-lg border border-slate-300">
                    <ReservationTable status={activeTab} />
                </div>
            </Tabs>
        </div>
    )
}

