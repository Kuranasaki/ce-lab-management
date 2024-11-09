import { GetExperimentResponse } from "@ce-lab-mgmt/api-interfaces";

export const getExperimentStatus = (item: GetExperimentResponse) => {
    if (item.markedAsDone && item.certificateUploadedAt) return 'completed';
    if (item.markedAsDone && !item.certificateUploadedAt) return 'waiting_for_certificate';
    return 'waiting_for_test';
};
