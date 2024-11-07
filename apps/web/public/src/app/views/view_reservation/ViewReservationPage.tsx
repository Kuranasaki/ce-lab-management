import { Button, Tabs, TabsList, TabsTrigger } from '@ce-lab-mgmt/shared-ui';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalTable, Header, Cell, StatusBar } from '@ce-lab-mgmt/shared-ui';
import { useReservationTable } from '../../hooks/view_reservation/useReservationTable';
import { ColumnDef } from '@tanstack/react-table';
import ReservationTableItemProps from '../../domain/entity/view_reservation/reservationTableItemProps';

export default function ViewReservationPage() {
  const [activeTab, setActiveTab] = useState<string>('');
  const { data, loading } = useReservationTable();

  const columns: ColumnDef<ReservationTableItemProps>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return <Header title="หมายเลขการจอง" column={column} />;
      },
      cell: ({ row }) => <Cell>{row.original.id}</Cell>,
    },
    {
      accessorKey: 'date',
      header: ({ column }) => {
        return <Header title="วันที่จอง" column={column} />;
      },
      cell: ({ row }) => {
        console.log(row);
        const reservationItem = row.original;
        const formattedDate = reservationItem.formatDate();

        return <Cell>{formattedDate}</Cell>;
      },
    },
    {
      accessorKey: 'type',
      header: ({ column }) => {
        return <Header title="ประเภทการทดสอบ" column={column} />;
      },
      cell: ({ row }) => <Cell>{row.original.type}</Cell>,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return <Header title="สถานะ" column={column} />;
      },
      cell: ({ row }) => (
        <Cell>
          <StatusBar status={row.original.status} />
        </Cell>
      ),
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => {
        return <Header title="ราคา" column={column} />;
      },
      cell: ({ row }) => {
        const reservationItem = row.original;
        const formattedAmount = reservationItem.formatAmount();

        return <Cell>{formattedAmount}</Cell>;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Tabs
        defaultValue=""
        onValueChange={(value) => setActiveTab(value)}
        className="w-full flex flex-col gap-6"
      >
        {' '}
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="">ทั้งหมด</TabsTrigger>
            <TabsTrigger value="pending">รออนุมัติ</TabsTrigger>
            <TabsTrigger value="processing">กำลังทดสอบ</TabsTrigger>
            <TabsTrigger value="success">สำเร็จ</TabsTrigger>
            <TabsTrigger value="canceled">ยกเลิก</TabsTrigger>
          </TabsList>
          <Link to="/reservation/request">
            <Button variant="default" size="sm">
              <PlusIcon />
              สร้างคำขอ
            </Button>
          </Link>
        </div>
        <GlobalTable
          columns={columns}
          data={data}
          loading={loading}
          filterFieldName={'status'}
          filterValue={activeTab}
          showPagination
        />
      </Tabs>
    </div>
  );
}
