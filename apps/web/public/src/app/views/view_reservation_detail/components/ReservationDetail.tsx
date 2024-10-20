import { ReservationStatus } from '../../../data/models/Reservation';
import ReservationDetailProps from '../../../domain/entity/view_reservation_detail/ReservationDetailProps';
import DetailBox from './DetailBox';

export default function ReservationDetail({
  data,
}: {
  data: ReservationDetailProps;
}) {
  if (data != null) {
    return (
      <DetailBox>
        <div className="grid grid-cols-1 gap-2">
          {data.id ? <Item title="หมายเลขคำขอ:" value={data.id} /> : ''}
          <Item title="วันที่ส่งคำขอ:" value={data.formatDate()} />
          <Item title="ประเภทการทดสอบ:" value={data.type} />
          {data.status ? (
            <Item
              title="สถานะ:"
              value={statusMap[data.status].text}
              className={statusMap[data.status].textColor}
            />
          ) : (
            ''
          )}
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
    <div className="grid grid-cols-1 gap-2">
      <div className="flex gap-4">
        <p className="font-bold">{title}</p>
        <p className={`${className}`}>{value}</p>
      </div>
    </div>
  );
};

const statusMap: {
  [key in ReservationStatus]: {
    text: string;
    bgColor: string;
    textColor: string;
  };
} = {
  [ReservationStatus.Pending]: {
    text: 'รออนุมัติ',
    bgColor: 'bg-warning-100',
    textColor: 'text-warning-700',
  },
  [ReservationStatus.Processing]: {
    text: 'กำลังทดสอบ',
    bgColor: 'bg-primary-100',
    textColor: 'text-primary-700',
  },
  [ReservationStatus.Success]: {
    text: 'สำเร็จ',
    bgColor: 'bg-success-100',
    textColor: 'text-success-500',
  },
  [ReservationStatus.Canceled]: {
    text: 'ยกเลิก',
    bgColor: 'bg-error-100',
    textColor: 'text-error-700',
  },
};
