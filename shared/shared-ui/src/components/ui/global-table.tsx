import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
  TableFooter,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ce-lab-mgmt/shared-ui';
import {
  CaretLeftIcon,
  CaretRightIcon,
  CaretSortIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons';
import {
  SortingState,
  ColumnFiltersState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  Column,
  ColumnDef,
} from '@tanstack/react-table';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface TableProps {
  columns: ColumnDef<any>[];
  data: any[];
  loading: boolean;
  filterFieldName?: string;
  filterValue?: any;
  pageIndex?: number;
  pageSize?: number;
  enablePagination?: boolean;
  renderFooterCell?: () => ReactNode;
  editable?: boolean;
  handleDeleteTest?: (id: number) => void;
  handleEditTest?: (id: number) => void;
  emptyDataText?: string;
}

export const GlobalTable: FC<TableProps> = ({
  columns,
  data,
  loading,
  filterFieldName,
  filterValue,
  pageIndex = 0,
  pageSize = 10,
  enablePagination = false,
  renderFooterCell,
  editable = false,
  handleDeleteTest,
  handleEditTest,
  emptyDataText = 'ไม่มีพบข้อมูล',
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  const rowStart = table.getRowModel().rows?.length
    ? table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize +
      1
    : 0;
  const rowEnd = Math.min(
    rowStart + table.getState().pagination.pageSize - 1,
    table.getFilteredRowModel().rows.length
  );
  const totalRows = table.getFilteredRowModel().rows.length;

  useEffect(() => {
    if (filterFieldName)
      table.getColumn(filterFieldName)?.setFilterValue(filterValue);
  }, [filterValue]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data != null) {
    return (
      <div className="rounded-lg overflow-hidden border border-slate-300">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="py-3 px-5" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                {editable && <TableHead className="w-[60px]" />}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-slate-700">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <Link to={`/reservation/${cell.row.original.id}`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Link>
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
                            handleDeleteTest &&
                            handleDeleteTest(parseInt(row.id))
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
                  <p>{emptyDataText}</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {renderFooterCell ? (
            <TableFooter>
              <TableRow className="bg-slate-50 py-3 px-5 text-slate-500">
                {renderFooterCell()}
              </TableRow>
            </TableFooter>
          ) : (
            enablePagination && (
              <TableFooter>
                <TableRow>
                  <TableCell
                    colSpan={editable ? columns.length + 1 : columns.length}
                    className="bg-slate-50 text-slate-500 py-3 px-5"
                  >
                    <div className="flex items-center justify-between ">
                      <p>
                        {rowStart}-{rowEnd} <span>of</span> {totalRows}
                      </p>
                      <div className="flex items-center gap-2 min-w-[200px]">
                        <p>Page Size:</p>
                        <Select
                          onValueChange={(e) => {
                            setPagination((prev) => {
                              return {
                                ...prev,
                                pageSize: parseInt(e),
                              };
                            });
                          }}
                        >
                          <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder={pageSize.toString()} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          className="p-1 w-fit h-fit border-slate-500"
                          onClick={() => table.previousPage()}
                          disabled={!table.getCanPreviousPage()}
                        >
                          <CaretLeftIcon className="size-4 stroke-slate-500" />
                        </Button>
                        <p>
                          {table.getRowModel().rows?.length
                            ? table.getState().pagination.pageIndex + 1
                            : 0}{' '}
                          / {table.getPageCount()}
                        </p>

                        <Button
                          variant="outline"
                          className="px-1 py-1 w-fit h-fit border-slate-500"
                          onClick={() => table.nextPage()}
                          disabled={!table.getCanNextPage()}
                        >
                          <CaretRightIcon className="size-4 stroke-slate-500" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            )
          )}
        </Table>
      </div>
    );
  }

  return null;
};

export const Header = ({
  title,
  column,
  className,
  sortable = false,
}: {
  title: string;
  column: Column<any>;
  className?: string;
  sortable?: boolean;
}) => {
  return sortable ? (
    <Button
      variant="ghost"
      size="default"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className={className}
    >
      {title}
      <CaretSortIcon className="ml-2 h-4 w-4" />
    </Button>
  ) : (
    <div className={`text-base text-slate-900 w-full ${className}`}>
      {title}
    </div>
  );
};

export const Cell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`pl-4 py-1 text-base ${className}`}>{children}</div>;
};

export const StatusBar = ({ status }: { status: string }) => {
  let text = '';
  let bgColor = '';
  let textColor = '';

  switch (status) {
    case 'pending':
      text = 'รออนุมัติ';
      bgColor = 'bg-warning-100';
      textColor = 'text-warning-700';
      break;
    case 'processing':
      text = 'กำลังทดสอบ';
      bgColor = 'bg-primary-100';
      textColor = 'text-primary-700';
      break;
    case 'success':
      text = 'สำเร็จ';
      bgColor = 'bg-success-100';
      textColor = 'text-success-500';
      break;
    case 'canceled':
      text = 'ยกเลิก';
      bgColor = 'bg-error-100';
      textColor = 'text-error-700';
      break;
    default:
      text = 'Unknown';
      bgColor = 'bg-gray-500';
      textColor = 'text-slate-700';
  }

  return (
    <div
      className={`w-fit px-2 py-1 rounded-3xl text-sm pointer-events-none ${bgColor} ${textColor}`}
    >
      {text}
    </div>
  );
};
