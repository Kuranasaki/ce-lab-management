import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import {
  ReservationStatus,
  ReservationType,
} from '@ce-lab-mgmt/api-interfaces';
import ReservationDetailProps from '../../../domain/entity/view_reservation_detail/ReservationDetailProps';
import { DetailBox } from '@ce-lab-mgmt/shared-ui';

export default function ReservationDetail({
  data,
}: {
  data: ReservationDetailProps;
}) {
  if (data != null) {
    const reservation = [
      { title: 'หมายเลขคำขอ:', value: data.id || null },
      { title: 'วันที่ส่งคำขอ:', value: data.formatDate() },
      {
        title: 'ประเภทการทดสอบ:',
        value: testTypeDisplayName[data.type as ReservationType],
      },
      {
        title: 'สถานะ:',
        value: data.status ? (
          <div
            className={`flex items-center gap-2 ${
              statusMap[data.status as ReservationStatus].textColor
            }`}
          >
            <span>{statusMap[data.status as ReservationStatus].text}</span>
            <QuestionMarkCircledIcon className="text-slate-500 cursor-pointer" />
          </div>
        ) : null,
      },
    ];

    return <DetailBox data={reservation} />;
  }

  return null;
}

const testTypeDisplayName = {
  [ReservationType.One]: 'การทดสอบวัสดุ',
  [ReservationType.Two]: 'การทดสอบเทียบ',
  [ReservationType.Three]: 'การทดสอบการทนไฟ',
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
