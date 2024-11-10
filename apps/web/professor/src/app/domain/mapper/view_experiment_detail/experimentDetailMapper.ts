import {
    BaseResponse,
    GetExperimentResponse,
} from '@ce-lab-mgmt/api-interfaces';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import ExperimentDetailProps from '../../entity/view_experiment_detail/ExperimentDetailProps';
import { getExperimentStatus } from '@ce-lab-mgmt/core-utils';
import { mockData } from '../view_experiment/experimentTableMapper';

export default async function experimentDetailMapper(
    rawData: BaseResponse<GetExperimentResponse>
): Promise<ExperimentDetailProps | ToastEntity> {

    // if (rawData.error) {
    //     return ToastEntity.fromCode(rawData.error.code);
    // }

    // if (!rawData.data) {
    //     return ToastEntity.unknownError();
    // }
    rawData.data = mockData[3]
    
    const experimentDetail = new ExperimentDetailProps(
        rawData.data.id,
        rawData.data.reservationID,
        rawData.data.testItemID,
        rawData.data.testName,
        rawData.data.testAmount,
        new Date(rawData.data.assignedAt),
        rawData.data.markedAsDone,
        getExperimentStatus(rawData.data),
        rawData.data.testDetails,
        rawData.data.testNote,
        rawData.data.assignedProfessorID,
        rawData.data.assignedProfessorName,
        rawData.data.testFormURL,
        rawData.data.markedAsDoneAt,
        rawData.data.certificateURL,
        rawData.data.certificateUploadedAt
    )

    console.log("xx",experimentDetail)


    return experimentDetail;
}
