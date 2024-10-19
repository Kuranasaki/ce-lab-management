import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger } from "@ce-lab-mgmt/shared-ui";
import { CaretSortIcon, DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { Column, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { table } from "console";
import React from "react";
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
        status: "success",
        amount: 3000,
    },
    {
        id: "m5gr84i9",
        date: new Date(),
        type: "one",
        status: "success",
        amount: 5000,
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

    return (
        <div className="flex flex-col gap-6">
            <Tabs defaultValue="all" className="w-full flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
                        <TabsTrigger value="pending">รออนุมัติ</TabsTrigger>
                        <TabsTrigger value="testing">กำลังทดสอบ</TabsTrigger>
                        <TabsTrigger value="done">สำเร็จ</TabsTrigger>
                        <TabsTrigger value="cancel">ยกเลิก</TabsTrigger>
                    </TabsList>
                    <Link to="/reservation/request">
                        <Button variant="default" size="sm"><PlusIcon />สร้างคำขอ</Button>
                    </Link>
                </div>
                <div className="rounded-md border">
                    <ReservationTable />
                </div>
            </Tabs>
        </div>
    )
}

const ReservationTable = () => {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
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
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
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

const Cell = <T,>({ value }: { value: T }) => {
    return <div className="pl-4">{String(value)}</div>;
};


export const columns: ColumnDef<Reservation>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Header title="หมายเลขการจอง" column={column} />
            )
        }, cell: ({ row }) => (
            <Cell value={row.getValue("id")} />
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

            return <Cell value={formatted} />;
        },
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Header title="ประเภทการทดสอบ" column={column} />
            )
        },
        cell: ({ row }) => <Cell value={row.getValue("type")} />,
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Header title="สถานะ" column={column} />
            )
        }, cell: ({ row }) => (
            <Cell value={row.getValue("status")} />
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

            return <Cell value={formatted} />
        },
    },
]
