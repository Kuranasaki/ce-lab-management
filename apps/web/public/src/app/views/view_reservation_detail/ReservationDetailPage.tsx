import { useParams } from 'react-router-dom';
import TestList from './components/TestList';
import { useTestList } from '../../hooks/view_reservation_detail/useTestList';
import ReservationDetail from './components/ReservationDetail';
import { useReservationDetail } from '../../hooks/view_reservation_detail/useReservationDetail';
import { useCustomerDetail } from '../../hooks/view_reservation_detail/useCustomerDetail';
import CustomerDetail from './components/CustomerDetail';
import { ReservationStatus } from '../../data/models/Reservation';
import { Cell, GlobalTable, Header } from '@ce-lab-mgmt/shared-ui';
import { ColumnDef } from '@tanstack/react-table';
import TestListTableItemProps from '../../domain/entity/view_reservation_detail/TestListTableItemProps';

export default function ReservationDetailPage() {
  const { id } = useParams();
  const { data: testListData, loading: loadingTestListdata } = useTestList({
    id,
  });
  const { data: reservationDetail, loading: loadingReservationDetail } =
    useReservationDetail();
  const { data: customerDetail, loading: loadingCustomerDetail } =
    useCustomerDetail();

  const columns: ColumnDef<TestListTableItemProps>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return <Header column={column} title="รายการ" />;
      },
      cell: ({ row }) => (
        <Cell>
          <div className="flex flex-1 flex-col">
            <p className="font-medium text-slate-700">{row.original.name}</p>
            <div className="flex flex-col text-slate-500">
              <div className="grid grid-cols-[auto,1fr] gap-x-2">
                {row.original.detail !== '' ? (
                  <>
                    <p>รายละเอียด:</p>
                    <p>{row.original.detail}</p>
                  </>
                ) : (
                  ''
                )}
                {row.original.note !== '' ? (
                  <>
                    <p>หมายเหตุ:</p>

                    <p>{row.original.note}</p>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </Cell>
      ),
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => {
        return (
          <Header
            className="text-center w-full"
            column={column}
            title="จำนวน"
          />
        );
      },
      cell: ({ row }) => (
        <Cell className="items-center justify-center flex">
          {row.original.amount}
        </Cell>
      ),
    },
    {
      accessorKey: 'unit',
      header: ({ column }) => {
        return (
          <Header
            className="text-center w-full"
            column={column}
            title="หน่วย"
          />
        );
      },
      cell: ({ row }) => (
        <Cell className="items-center justify-center flex">
          {row.original.unit}
        </Cell>
      ),
    },
    {
      accessorKey: 'priceperunit',
      header: ({ column }) => {
        return (
          <Header
            className="text-center w-full"
            column={column}
            title="ราคาต่อหน่วย"
          />
        );
      },
      cell: ({ row }) => (
        <Cell className="items-center justify-center flex">
          {row.original.formatPricePerUnit()}
        </Cell>
      ),
    },
  ];

  if (!id) {
    return;
  }

  if (
    loadingTestListdata ||
    loadingReservationDetail ||
    loadingCustomerDetail
  ) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h4>ข้อมูลผู้ขอรับบริการทดสอบ</h4>
        <CustomerDetail data={customerDetail} />
      </div>
      <div className="flex flex-col gap-4">
        <h4>ข้อมูลคำขอรับบริการทดสอบ</h4>
        <ReservationDetail data={reservationDetail} />
        {reservationDetail.status === ReservationStatus.Pending ? (
          <p className="text-error-500">
            *กรุณาติดต่อหน่วยทดสอบวัสดุ เพื่อจ่ายเงินและส่งมอบของ
          </p>
        ) : (
          ''
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h4>รายการทดสอบ</h4>
        <GlobalTable
          columns={columns}
          data={testListData.items}
          loading={loadingTestListdata}
        />
      </div>
    </div>
  );
}
