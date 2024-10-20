import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Button, TableFooter } from "@ce-lab-mgmt/shared-ui";
import { CaretLeftIcon, CaretRightIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { SortingState, ColumnFiltersState, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender, Column, ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useReservationTable } from "../../../hooks/useReservationTable";
import ReservationTableItem from "../../../domain/entity/reservationTableItem";
import { ReservationStatus } from "../../../data/models/Reservation";

export default function ReservationTable({ status }: { status: string }) {

    const { data, loading } = useReservationTable();

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    const rowStart = table.getRowModel().rows?.length ? table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 : 0;
    const rowEnd = Math.min(rowStart + table.getState().pagination.pageSize - 1, table.getFilteredRowModel().rows.length);
    const totalRows = table.getFilteredRowModel().rows.length;

    useEffect(() => {
        table.getColumn("status")?.setFilterValue(status)
    }, [status]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (data != null) {
        return (<>
            <Table>
                <TableHeader className="bg-slate-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead className="py-2" key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="text-slate-700">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
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
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-32 text-center text-slate-500"
                            >
                                <p>No results.</p>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="bg-slate-50 text-slate-500 py-3 px-5"
                        >
                            <div className="flex justify-between ">
                                <p>{rowStart}-{rowEnd} <span>of</span> {totalRows}</p>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            className="px-1 py-1 w-fit h-fit border-slate-500"
                                            onClick={() => table.previousPage()}
                                            disabled={!table.getCanPreviousPage()}
                                        >
                                            <CaretLeftIcon className="size-4 stroke-slate-500" />
                                        </Button>
                                        <p>{table.getRowModel().rows?.length ? table.getState().pagination.pageIndex + 1 : 0} / {table.getPageCount()}</p>
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
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

        </>
        )
    }

    return null;
}

const Header = ({ title, column }: { title: string, column: Column<ReservationTableItem> }) => {
    return (
        <Button
            variant="ghost" size="default"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
    )
}

const Cell = ({ children }: { children: React.ReactNode }) => {
    return <div className="pl-4 py-1 text-base">{children}</div>;
};


const columns: ColumnDef<ReservationTableItem>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Header title="หมายเลขการจอง" column={column} />
            )
        }, cell: ({ row }) => (
            <Cell>{row.original.id}</Cell>
        ),
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Header title="วันที่จอง" column={column} />
            )
        }, cell: ({ row }) => {

            const reservationItem = row.original;
            const formattedDate = reservationItem.formatDate();

            return <Cell>{formattedDate}</Cell>
        },
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Header title="ประเภทการทดสอบ" column={column} />
            )
        },
        cell: ({ row }) => <Cell>{row.original.type}</Cell>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Header title="สถานะ" column={column} />
            )
        }, cell: ({ row }) => (
            <Cell><StatusBar status={row.original.status} /></Cell>
        ),
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Header title="ราคา" column={column} />
            )
        },
        cell: ({ row }) => {
            const reservationItem = row.original;
            const formattedAmount = reservationItem.formatAmount();

            return <Cell>{formattedAmount}</Cell>
        },
    },
]

const StatusBar = ({ status }: { status: ReservationStatus }) => {

    const statusMap: { [key in ReservationStatus]: { text: string; bgColor: string; textColor: string; } } = {
        [ReservationStatus.Pending]: { text: "รออนุมัติ", bgColor: "bg-warning-100", textColor: "text-warning-700" },
        [ReservationStatus.Processing]: { text: "กำลังทดสอบ", bgColor: "bg-primary-100", textColor: "text-primary-700" },
        [ReservationStatus.Success]: { text: "สำเร็จ", bgColor: "bg-success-100", textColor: "text-success-500" },
        [ReservationStatus.Canceled]: { text: "ยกเลิก", bgColor: "bg-error-100", textColor: "text-error-700" },
    };

    const { text, bgColor, textColor } = statusMap[status] || { text: "Unknown", bgColor: "bg-gray-500", textColor: "text-slate-700" };

    return (
        <div className={`w-fit px-2 py-1 rounded-3xl text-sm pointer-events-none ${bgColor} ${textColor}`}>
            {text}
        </div>
    );
};
