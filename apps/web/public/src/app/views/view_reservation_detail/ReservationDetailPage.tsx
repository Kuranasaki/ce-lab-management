import { useParams } from 'react-router-dom';
import ReservationDetail from './components/ReservationDetail';
import { useReservationDetail } from '../../hooks/view_reservation_detail/useReservationDetail';
import CustomerDetail from './components/CustomerDetail';
import { ReservationStatus } from '@ce-lab-mgmt/api-interfaces';
import { Cell, GlobalTable, Header, TableCell } from '@ce-lab-mgmt/shared-ui';
import { ColumnDef } from '@tanstack/react-table';
import TestListTableItemProps from '../../domain/entity/view_reservation_detail/TestListTableItemProps';

export default function ReservationDetailPage() {
  const { id } = useParams();
  const { customer, reservationDetail, testList, loading } =
    useReservationDetail(id || '');

  const columns: ColumnDef<TestListTableItemProps>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return <Header column={column} title="รายการ" />;
      },
      cell: ({ row }) => (
        <Cell>
          <div className="flex flex-col">
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
        return <Header column={column} title="จำนวน" className="text-center" />;
      },
      cell: ({ row }) => (
        <Cell className="text-center">{row.original.amount}</Cell>
      ),
    },
    {
      accessorKey: 'unit',
      header: ({ column }) => {
        return <Header column={column} title="หน่วย" className="text-center" />;
      },
      cell: ({ row }) => (
        <Cell className="text-center">{row.original.unit}</Cell>
      ),
    },
    {
      accessorKey: 'priceperunit',
      header: ({ column }) => {
        return (
          <Header
            column={column}
            title="ราคาต่อหน่วย"
            className="text-center"
          />
        );
      },
      cell: ({ row }) => (
        <Cell className="text-center">{row.original.formatPricePerUnit()}</Cell>
      ),
    },
  ];

  if (!id) {
    return;
  }
  if (!id) {
    return;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h4>ข้อมูลผู้ขอรับบริการทดสอบ</h4>
        <CustomerDetail data={customer} />
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
          data={testList.items}
          loading={loading}
          editable
          renderFooterCell={() => (
            <TableCell
              colSpan={columns.length + 1}
              className="bg-slate-50 text-slate-500 py-3 px-5"
            >
              <div className="flex gap-4 justify-end">
                <p className="font-bold">ราคารวม</p>
                <p>
                  {testList.totalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}{' '}
                  บาท
                </p>
              </div>
            </TableCell>
          )}
        />
      </div>
    </div>
  );
}
