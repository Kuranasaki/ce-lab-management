import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@ce-lab-mgmt/shared-ui';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import TestListTableProps from '../../../domain/entity/view_reservation_detail/TestListTableProps';
import TestListTableItemProps from '../../../domain/entity/view_reservation_detail/TestListTableItemProps';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

export default function TestList({
  data,
  editable = false,
  handleDeleteTest,
  handleEditTest,
}: {
  data: TestListTableProps;
  editable?: boolean;
  handleDeleteTest?: (index: number) => void;
  handleEditTest?: (index: number) => void;
}) {
  const table = useReactTable({
    data: data.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg border border-slate-300 overflow-clip">
      <Table>
        <TableHeader className="bg-slate-50 ">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="px-5" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="py-3 px-5" key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                );
              })}
              {editable ? <TableHead /> : ''}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="text-slate-700">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="py-3 px-5" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {editable ? (
                  <TableCell>
                    <div className="flex gap-4 justify-center">
                      <div
                        className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                        onClick={() =>
                          handleEditTest && handleEditTest(parseInt(row.id))
                        }
                      >
                        <Pencil1Icon className="size-5" />
                      </div>
                      <div
                        className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                        onClick={() =>
                          handleDeleteTest && handleDeleteTest(parseInt(row.id))
                        }
                      >
                        <TrashIcon className="size-5" />
                      </div>
                    </div>
                  </TableCell>
                ) : (
                  ''
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-slate-500"
              >
                <p>ไม่มีรายการทดสอบในขณะนี้</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={editable ? columns.length + 1 : columns.length}
              className="bg-slate-50 text-slate-500 py-3 px-5"
            >
              <div className="flex gap-4 justify-end">
                <p className="font-bold">ราคารวม</p>
                <p>{data.totalPrice.toFixed(2)} บาท</p>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

const Header = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={`text-base text-slate-900 w-full ${className}`}>
      {title}
    </div>
  );
};

const Cell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex text-base items-center justify-center">{children}</div>
  );
};

const columns: ColumnDef<TestListTableItemProps>[] = [
  {
    accessorKey: 'name',
    header: () => {
      return <Header title="รายการ" />;
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
    header: () => {
      return <Header className="text-center" title="จำนวน" />;
    },
    cell: ({ row }) => <Cell>{row.original.amount}</Cell>,
  },
  {
    accessorKey: 'unit',
    header: () => {
      return <Header className="text-center" title="หน่วย" />;
    },
    cell: ({ row }) => <Cell>{row.original.unit}</Cell>,
  },
  {
    accessorKey: 'priceperunit',
    header: () => {
      return <Header className="text-center" title="ราคาต่อหน่วย" />;
    },
    cell: ({ row }) => <Cell>{row.original.formatPricePerUnit()}</Cell>,
  },
];
