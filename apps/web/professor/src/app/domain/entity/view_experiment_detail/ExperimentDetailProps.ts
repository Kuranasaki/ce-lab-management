export default class ExperimentDetailProps {

    id: string;
    reservationID: string;
    testItemID: string;
    testName: string;
    testAmount: number;
    testDetails?: string;
    testNote?: string;
    assignedProfessorID?: string;
    assignedProfessorName?: string;
    assignedAt: Date;
    testFormURL?: string;
    markedAsDone: boolean;
    markedAsDoneAt?: Date;
    certificateURL?: string;
    certificateUploadedAt?: Date;
    status: string;

    constructor(
        id: string,
        reservationID: string,
        testItemID: string,
        testName: string,
        testAmount: number,
        assignedAt: Date,
        markedAsDone: boolean,
        status: string,
        testDetails?: string,
        testNote?: string,
        assignedProfessorID?: string,
        assignedProfessorName?: string,
        testFormURL?: string,
        markedAsDoneAt?: Date,
        certificateURL?: string,
        certificateUploadedAt?: Date,
    ) {
        this.id = id;
        this.reservationID = reservationID;
        this.testItemID = testItemID;
        this.testName = testName;
        this.testAmount = testAmount;
        this.assignedAt = assignedAt;
        this.markedAsDone = markedAsDone;
        this.testDetails = testDetails;
        this.testNote = testNote;
        this.assignedProfessorID = assignedProfessorID;
        this.assignedProfessorName = assignedProfessorName;
        this.testFormURL = testFormURL;
        this.markedAsDoneAt = markedAsDoneAt;
        this.certificateURL = certificateURL;
        this.certificateUploadedAt = certificateUploadedAt;
        this.status=status;
    }

    formatAssignedAt(): string {
        return this.assignedAt.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    private formatDateTime(date: Date | undefined): string | undefined {
        if (date) {
            return date.toLocaleString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,  // Use 24-hour time format
            });
        }
        return undefined;
    }
    
    formatMarkedAsDoneAt(): string | undefined {
        return this.formatDateTime(this.markedAsDoneAt);
    }
    
    formatCertificateUploadedAt(): string | undefined {
        return this.formatDateTime(this.certificateUploadedAt);
    }
}
