import {
    BaseResponse,
    GetAllExperimantResponse,
} from '@ce-lab-mgmt/api-interfaces';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import ExperimentTableItemProps from '../../entity/view_experiment/experimentTableItemProps';
import { getExperimentStatus } from '@ce-lab-mgmt/core-utils';

export const mockData = [
    {
        id: "exp67890",
        reservationID: "res67890",
        testItemID: "testItem456",
        testName: "Compression test for reinforced concrete samples",
        testAmount: 3,
        testDetails: "Details about the compression test.",
        testNote: "Urgent - deliver results by next week.",
        assignedProfessorID: "prof789",
        assignedProfessorName: "Dr. Jane Smith",
        assignedAt: new Date("2024-11-02T14:30:00Z"),
        testFormURL: undefined,
        markedAsDone: false,
        markedAsDoneAt: undefined,
        certificateURL: undefined,
        certificateUploadedAt: undefined,
    },
    {
        id: "exp67890",
        reservationID: "res67890",
        testItemID: "testItem456",
        testName: "Compression test for reinforced concrete samples",
        testAmount: 3,
        testDetails: "Details about the compression test.",
        testNote: "Urgent - deliver results by next week.",
        assignedProfessorID: "prof789",
        assignedProfessorName: "Dr. Jane Smith",
        assignedAt: new Date("2024-11-02T14:30:00Z"),
        testFormURL: "https://example.com/compression-test-form",
        markedAsDone: false,
        markedAsDoneAt: undefined,
        certificateURL: undefined,
        certificateUploadedAt: undefined,
    },
    {
        id: "exp24680",
        reservationID: "res24680",
        testItemID: "testItem789",
        testName: "Impact test for structural steel samples",
        testAmount: 8,
        testDetails: "Customer requested additional testing under high-temperature conditions.",
        testNote: "Handle with extra caution.",
        assignedProfessorID: "prof123",
        assignedProfessorName: "Dr. Alice Johnson",
        assignedAt: new Date("2024-11-03T11:45:00Z"),
        testFormURL: "https://example.com/impact-test-form",
        markedAsDone: true,
        markedAsDoneAt: new Date("2024-11-05T15:30:00Z"),
        certificateURL: undefined,
        certificateUploadedAt: undefined,
    },
    {
        id: "exp12345",
        reservationID: "res12345",
        testItemID: "testItem123",
        testName: "Tensile test of prestressed wire and prestressed strand: wire ø 7 mm",
        testAmount: 5,
        testDetails: "Sample test details provided by the customer.",
        testNote: "Note added by customer for additional information.",
        assignedProfessorID: "prof456",
        assignedProfessorName: "Dr. John Doe",
        assignedAt: new Date("2024-11-01T10:00:00Z"),
        testFormURL: "https://example.com/test-form",
        markedAsDone: true,
        markedAsDoneAt: new Date("2024-11-05T15:30:00Z"),
        certificateURL: "https://example.com/certificate",
        certificateUploadedAt: new Date("2024-11-06T10:00:00Z"),
    },
]

export default async function experimentTableMapper(
    rawData?: BaseResponse<GetAllExperimantResponse>
): Promise<ExperimentTableItemProps[] | ToastEntity> {
    // if (rawData.error) {
    //     return ToastEntity.fromCode(rawData.error.code);
    // }

    // if (!rawData.data) {
    //     return ToastEntity.unknownError();
    // }

    const experiments: ExperimentTableItemProps[] = mockData.map(
    // const experiments: ExperimentTableItemProps[] = rawData.data.map(
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
