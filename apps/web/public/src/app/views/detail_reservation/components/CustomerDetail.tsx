import { ReservationStatus } from '../../../data/models/Reservation';
import CustomerDetailProps from '../../../domain/entity/CustomerDetailProps';
import ReservationDetailProps from '../../../domain/entity/ReservationDetailProps';
import DetailBox from './DetailBox';

export default function CustomerDetail({ data }: { data: CustomerDetailProps }) {

    if (data != null) {
        return (
            <DetailBox>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <Item title='บริษัท/หน่วยงาน:' value={data.orgName} />
                    </div>
                    <div className="col-span-2">
                        <Item title='โครงการ::' value={data.orgProjectName} />
                    </div>
                    <div className="col-span-2">
                        <Item title='ที่อยู่:' value={data.orgAddress} />
                    </div>
                    <div className="col-span-2">
                        <Item title='อีเมล:' value={data.orgEmail} />
                    </div>
                    <div className="">
                        <Item title='โทรศัพท์:' value={data.formatPhone()} />
                    </div>
                    <div className="">
                        <Item title='โทรสาร:' value={data.orgFax} />
                    </div>
                </div>
            </DetailBox>
        );
    }

    return null;
}

const Item = ({ title, value, className }: { title: string, value: string, className?: string }) => {
    return (
        <div className="grid grid-cols-1 gap-2">
            <div className="flex gap-4">
                <p className="font-bold">{title}</p>
                <p className={`${className}`}>{value}</p>
            </div>
        </div>
    );
};
