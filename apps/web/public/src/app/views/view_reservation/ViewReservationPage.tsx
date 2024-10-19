import { Button } from "@ce-lab-mgmt/shared-ui";
import { PlusIcon } from "@radix-ui/react-icons";

export default function ViewReservationPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>BAR</div>
                <Button variant="default" size="sm"><PlusIcon />สร้างคำขอ</Button>
            </div>
            <div>TABLE</div>
        </div>
    )
}
