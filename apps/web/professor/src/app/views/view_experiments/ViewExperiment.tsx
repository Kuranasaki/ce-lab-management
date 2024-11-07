import { Button, Input, Tabs, TabsList, TabsTrigger } from "@ce-lab-mgmt/shared-ui";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function ViewExperimentsPage() {
    const { t } = useTranslation(['common', 'view_experiments']);

    const [activeTab, setActiveTab] = useState<string>('');

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
                    <Input className="w-1/4" placeholder={t('search')} />
                </div>
                <div className="rounded-lg border border-slate-300">
                    TODO: TABLE
                </div>
            </Tabs>
        </div>
    )
}
