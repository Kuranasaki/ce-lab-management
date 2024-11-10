import { useEffect, useState } from 'react';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import ExperimentDetailProps from '../../domain/entity/view_experiment_detail/ExperimentDetailProps';
import getExperimentDetail from '../../domain/usecase/view_experiment_detail.ts/getExperimentDetail';

export function useExperimentDetail(id: string) {
    const [experimentDetail, setExperimentDetail] = useState<ExperimentDetailProps>();
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        const data = await getExperimentDetail(id);

        if (data instanceof ToastEntity) {
            console.log(data.description);
        } else {
            // Set the state variables with the fetched data
            if (data instanceof ExperimentDetailProps) {
                setExperimentDetail(data);
            }

        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { experimentDetail, loading };
}
