import { Cell, GlobalTable, Header, Input, StatusColorBar, Tabs, TabsList, TabsTrigger } from "@ce-lab-mgmt/shared-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";
import ExperimentTableItemProps from "../../domain/entity/view_experiment/experimentTableItemProps";
import { useExperimentTable } from "../../hooks/view_experiment/useExperimentTable";
export default function ViewExperimentsPage() {
    const { t } = useTranslation(['common', 'view_experiments']);

    const [activeTab, setActiveTab] = useState<string>('');
    const { data, loading } = useExperimentTable();

    const columns: ColumnDef<ExperimentTableItemProps>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => {
                return <Header title="หมายเลขการทดสอบ" column={column} />;
            },
            cell: ({ row }) => <Cell>{row.original.id}</Cell>,
        },
        {
            accessorKey: 'assignedAt',
            header: ({ column }) => {
                return <Header title="วันที่มอบหมาย" column={column} />;
            },
            cell: ({ row }) => <Cell>{row.original.assignedAt.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}</Cell>,
        },
        {
            accessorKey: 'testName',
            header: ({ column }) => {
                return <Header title="ชื่อการทดสอบ" column={column} />;
            },
            cell: ({ row }) => <Cell>{row.original.testName}</Cell>,
        },
        {
            accessorKey: 'status',
            header: ({ column }) => {
                return <Header title="สถานะ" column={column} />;
            },
            cell: ({ row }) => <Cell><StatusColorBar text={t(`view_experiments:${row.original.status}`)} variant={statusMap[row.original.status]}/></Cell>,
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            <Tabs
                defaultValue=""
                onValueChange={(value) => setActiveTab(value)}
                className="w-full flex flex-col gap-6"
            >
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="">{t('view_experiments:all')}</TabsTrigger>
                        <TabsTrigger value="waiting_for_test">{t('view_experiments:waiting_for_test')}</TabsTrigger>
                        <TabsTrigger value="waiting_for_certificate">{t('view_experiments:waiting_for_certificate')}</TabsTrigger>
                        <TabsTrigger value="completed">{t('view_experiments:completed')}</TabsTrigger>
                    </TabsList>
                    <Input className="w-1/4" disabled placeholder={t('search')} />
                </div>
                <div className="rounded-lg border border-slate-300">
                    <GlobalTable
                        columns={columns}
                        data={data}
                        loading={loading}
                        filterFieldName={'status'}
                        filterValue={activeTab}
                        emptyDataText={t('view_experiments:not_found_text')}
                        enablePagination
                        clickForGetDetail
                    />
                </div>
            </Tabs>
        </div>
    )
}

const statusMap: { [key: string]: string } = {
    waiting_for_test: 'warning',
    waiting_for_certificate: 'primary',
    completed: 'success',
};