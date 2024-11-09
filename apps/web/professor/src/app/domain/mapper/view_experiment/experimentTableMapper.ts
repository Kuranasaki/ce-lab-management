import {
    BaseResponse,
    GetAllExperimantResponse,
} from '@ce-lab-mgmt/api-interfaces';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import ExperimentTableItemProps from '../../entity/view_experiment/experimentTableItemProps';
import { getExperimentStatus } from '@ce-lab-mgmt/core-utils';

export default async function experimentTableMapper(
    rawData: BaseResponse<GetAllExperimantResponse>
): Promise<ExperimentTableItemProps[] | ToastEntity> {
    if (rawData.error) {
        return ToastEntity.fromCode(rawData.error.code);
    }

    if (!rawData.data) {
        return ToastEntity.unknownError();
    }

    const experiments: ExperimentTableItemProps[] = rawData.data.map(
        (experiment) => {
            return new ExperimentTableItemProps(
                experiment.id,
                new Date(experiment.assignedAt),
                experiment.testName,
                getExperimentStatus(experiment),
            );
        }
    );

    return experiments;
}
