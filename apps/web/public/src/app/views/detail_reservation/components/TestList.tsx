import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@ce-lab-mgmt/shared-ui";
import { Column, ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { Dispatch, SetStateAction } from "react";
import TestListTable from "../../../domain/entity/TestListTable";
import TestListTableItem from "../../../domain/entity/TestListTableItem";

export default function TestList({ data, editable, setData }: { data: TestListTable, editable: boolean, setData: Dispatch<SetStateAction<TestListTable>> }) {

    const table = useReactTable({
        data: data.items,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const handleDeleteTest = (itemId: string) => {
        // Call removeItem with the specific itemId you want to delete
        setData(data.removeItem(itemId));
    };

    const handleEditTest = (itemId: string, updatedItem: Partial<TestListTableItem>) => {
        // Call editItem with the specific itemId and the updated item data
        setData(data.editItem(itemId, updatedItem));
    };

    return (

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
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                            {editable ?
                                <TableCell >
                                    <Button onClick={() => handleEditTest(row.original.id, { price: 450 })}>Edit</Button>
                                    <Button onClick={() => handleDeleteTest(row.original.id)}>Delete</Button>
                                </TableCell>
                                : ""
                            }
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
                        ราคารวม {data.totalPrice} บาท
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>

    );
}

const Header = ({ title, column }: { title: string, column: Column<TestListTableItem> }) => {
    return (
        <div className="text-base">{title}</div>
    )
}

const Cell = ({ children }: { children: React.ReactNode }) => {
    return <div className="pl-4 py-1 text-base">{children}</div>;
};

const columns: ColumnDef<TestListTableItem>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Header title="รายการ" column={column} />
            )
        }, cell: ({ row }) => (
            <Cell>
                <div>{row.original.name}</div>
                <div>รายละเอียด: {row.original.detail}</div>
                <div>หมายเหตุ: {row.original.note}</div>
            </Cell>
        ),
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Header title="จำนวน" column={column} />
            )
        }, cell: ({ row }) => (
            <Cell>{row.original.amount}</Cell>
        ),
    },
    {
        accessorKey: "unit",
        header: ({ column }) => {
            return (
                <Header title="หน่วย" column={column} />
            )
        }, cell: ({ row }) => (
            <Cell>{row.original.unit}</Cell>
        ),
    },
    {
        accessorKey: "priceperunit",
        header: ({ column }) => {
            return (
                <Header title="ราคาต่อหน่วย" column={column} />
            )
        }, cell: ({ row }) => (
            <Cell>{row.original.formatPrice()}</Cell>
        ),
    },

]