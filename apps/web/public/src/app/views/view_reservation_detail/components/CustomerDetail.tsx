import CustomerDetailProps from '../../../domain/entity/view_reservation_detail/CustomerDetailProps';
import DetailBox from './DetailBox';

export default function CustomerDetail({
  data,
}: {
  data: CustomerDetailProps;
}) {
  if (data != null) {
    return (
      <DetailBox>
        <div className="grid grid-cols-2 gap-4">
          <Item title="บริษัท/หน่วยงาน:" value={data.orgName} className="col-span-2" />
          <Item title="โครงการ:" value={data.orgProjectName} className="col-span-2" />
          <Item title="ที่อยู่:" value={data.orgAddress} className="col-span-2" />
          <Item title="อีเมล:" value={data.orgEmail} className="col-span-2" />
          <Item title="โทรศัพท์:" value={data.formatPhone()} />
          <Item title="โทรสาร:" value={data.orgFax} />
        </div>
      </DetailBox>
    );
  }

  return null;
}

const Item = ({
  title,
  value,
  className,
}: {
  title: string;
  value: string;
  className?: string;
}) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      <p className="font-bold">{title}</p>
      <p >{value}</p>
    </div>
  );
};
