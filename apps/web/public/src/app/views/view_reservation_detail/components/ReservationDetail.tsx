import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import {
  ReservationStatus,
  ReservationType,
} from '@ce-lab-mgmt/api-interfaces';
import ReservationDetailProps from '../../../domain/entity/view_reservation_detail/ReservationDetailProps';
import DetailBox from './DetailBox';

export default function ReservationDetail({
  data,
}: {
  data: ReservationDetailProps;
}) {
  const testTypeDisplayName = {
    [ReservationType.One]: 'การทดสอบวัสดุ',
    [ReservationType.Two]: 'การทดสอบเทียบ',
    [ReservationType.Three]: 'การทดสอบการทนไฟ',
  };

  if (data != null) {
    return (
      <DetailBox>
        <div className="grid grid-cols-1 gap-2">
          {data.id ? <Item title="หมายเลขคำขอ:" value={data.id} /> : ''}
          <Item title="วันที่ส่งคำขอ:" value={data.formatDate()} />
          <Item
            title="ประเภทการทดสอบ:"
            value={testTypeDisplayName[data.type as ReservationType]}
          />
          {data.status ? (
            <Item
              title="สถานะ:"
              value={statusMap[data.status as ReservationStatus].text}
              valueClassName={
                statusMap[data.status as ReservationStatus].textColor
              }
            >
              <QuestionMarkCircledIcon className="text-slate-500 cursor-pointer" />
            </Item>
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
  valueClassName,
  children,
}: {
  title: string;
  value: string;
  valueClassName?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex gap-4 items-center">
      <p className="font-bold">{title}</p>
      <p className={`${valueClassName}`}>{value}</p>
      {children}
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
