import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsList, TabsTrigger } from "@ce-lab-mgmt/shared-ui";
import { CaretLeftIcon, CaretRightIcon, CaretSortIcon, PlusIcon } from "@radix-ui/react-icons";
import { Column, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export type Reservation = {
    id: string
    date: Date
    type: "one" | "two" | "three"
    status: "pending" | "processing" | "success" | "canceled"
    amount: number
}

const data: Reservation[] = [
    {
        id: "m5gr84i8",
        date: new Date(),
        type: "one",
        status: "pending",
        amount: 3000,
    },
    {
        id: "m5gr84i8",
        date: new Date(),
        type: "one",
        status: "pending",
        amount: 3000,
    },
    {
        id: "m5gr84i8",
        date: new Date(),
        type: "one",
        status: "pending",
        amount: 3000,
    },
    {
        id: "m5gr84i8",
        date: new Date(),
        type: "one",
        status: "pending",
        amount: 3000,
    },
    {
        id: "m5gr84i8",
        date: new Date(),
        type: "one",
        status: "pending",
        amount: 3000,
    },
    {
        id: "m5gr84i8",
        date: new Date(),
        type: "one",
        status: "pending",
        amount: 3000,
    },
    {
        id: "m5gr84i8",
        date: new Date(),
        type: "one",
        status: "pending",
        amount: 3000,
    },
    {
        id: "m5gr84i8",
        date: new Date(),
        type: "one",
        status: "pending",
        amount: 3000,
    },
    {
        id: "m5gr84i8",
        date: new Date(),
        type: "one",
        status: "pending",
        amount: 3000,
    },
    {
        id: "m5gr84i8",
        date: new Date(),
        type: "one",
        status: "pending",
        amount: 3000,
    },
    {
        id: "m5gr84i8",
        date: new Date(),
        type: "one",
        status: "pending",
        amount: 3000,
    },
    {
        id: "m5gr84i8",
        date: new Date(),
        type: "one",
        status: "pending",
        amount: 3000,
    },
    {
        id: "m5gr84i9",
        date: new Date(),
        type: "one",
        status: "processing",
        amount: 5000,
    },
    {
        id: "m5gr84i7",
        date: new Date(),
        type: "one",
        status: "success",
        amount: 45000,
    },
    {
        id: "m5gr84i7",
        date: new Date(),
        type: "one",
        status: "canceled",
        amount: 45000,
    },
    {
        id: "m5gr84i7",
        date: new Date(),
        type: "one",
        status: "success",
        amount: 45000,
    },
]

export default function ViewReservationPage() {
    const [activeTab, setActiveTab] = useState<string>('');

    return (
        <div className="flex flex-col gap-6">
            <Tabs
                defaultValue=""
                onValueChange={(value) => setActiveTab(value)}
                className="w-full flex flex-col gap-6"
            >                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="">ทั้งหมด</TabsTrigger>
                        <TabsTrigger value="pending">รออนุมัติ</TabsTrigger>
                        <TabsTrigger value="processing">กำลังทดสอบ</TabsTrigger>
                        <TabsTrigger value="success">สำเร็จ</TabsTrigger>
                        <TabsTrigger value="canceled">ยกเลิก</TabsTrigger>
                    </TabsList>
                    <Link to="/reservation/request">
                        <Button variant="default" size="sm"><PlusIcon />สร้างคำขอ</Button>
                    </Link>
                </div>
                <div className="rounded-lg border border-slate-300">
                    <ReservationTable status={activeTab} />
                </div>
            </Tabs>
        </div>
    )
}

const ReservationTable = ({ status }: { status: string }) => {

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

    const rowStart = table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1;
    const rowEnd = Math.min(rowStart + table.getState().pagination.pageSize - 1, table.getFilteredRowModel().rows.length);
    const totalRows = table.getFilteredRowModel().rows.length;

    useEffect(() => {
        table.getColumn("status")?.setFilterValue(status)
    }, [status]);

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
        </Table>
        <div className="w-full flex justify-between py-3 px-5 border-t text-slate-500 bg-slate-50">
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
                    <p>{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}</p>
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
    </>
    )
}

const Header = ({ title, column }: { title: string, column: Column<Reservation> }) => {
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


const columns: ColumnDef<Reservation>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Header title="หมายเลขการจอง" column={column} />
            )
        }, cell: ({ row }) => (
            <Cell>{row.getValue("id")}</Cell>
        ),
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Header title="วันที่จอง" column={column} />
            )
        }, cell: ({ row }) => {
            const date = new Date(row.getValue("date"));

            const formatted = new Intl.DateTimeFormat("th-TH", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(date);

            return <Cell>{formatted}</Cell>
        },
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Header title="ประเภทการทดสอบ" column={column} />
            )
        },
        cell: ({ row }) => <Cell>{row.getValue("type")}</Cell>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Header title="สถานะ" column={column} />
            )
        }, cell: ({ row }) => (
            <Cell><StatusBar status={row.getValue("status")} /></Cell>
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
            const amount = parseFloat(row.getValue("amount"))

            const formatted = new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
            }).format(amount)

            return <Cell>{formatted}</Cell>
        },
    },
]

const StatusBar = ({ status }: { status: string }) => {

    const statusMap: { [key: string]: { text: string; bgColor: string; textColor: string; } } = {
        pending: { text: "รออนุมัติ", bgColor: "bg-warning-100", textColor: "text-warning-700" },
        processing: { text: "กำลังทดสอบ", bgColor: "bg-primary-100", textColor: "text-primary-700" },
        success: { text: "สำเร็จ", bgColor: "bg-success-100", textColor: "text-success-500" },
        canceled: { text: "ยกเลิก", bgColor: "bg-error-100", textColor: "text-error-700" },
    };

    const { text, bgColor, textColor } = statusMap[status] || { text: "Unknown", bgColor: "bg-gray-500", textColor: "text-slate-700" };

    return (
        <div className={`w-fit px-2 py-1 rounded-3xl text-sm pointer-events-none ${bgColor} ${textColor}`}>
            {text}
        </div>
    );
};
