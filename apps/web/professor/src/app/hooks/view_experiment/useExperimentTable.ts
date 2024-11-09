import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import ExperimentTableItemProps from '../../domain/entity/view_experiment/experimentTableItemProps';
import getExperimentTable from '../../domain/usecase/view_experiment.ts/getExperimentTable';

export function useExperimentTable() {
    const [data, setData] = useState<ExperimentTableItemProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        const data = await getExperimentTable();
        if (
            Array.isArray(data) &&
            data.every((item) => item instanceof ExperimentTableItemProps)
        ) {
            setData(data);
        }

        if (data instanceof ToastEntity) {
            // Show toast using redux?
            console.log((data as ToastEntity).description);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading };
}
