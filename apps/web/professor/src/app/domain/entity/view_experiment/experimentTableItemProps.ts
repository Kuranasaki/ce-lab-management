export default class ExperimentTableItemProps {
    id: string;
    assignedAt: Date;
    testName: string;
    status: string;

    constructor(
        id: string,
        assignedAt: Date,
        testName: string,
        status: string,
    ) {
        this.id = id;
        this.assignedAt = assignedAt;
        this.testName = testName;
        this.status = status;
    }

    formatAssignedAt(): string {
        return this.assignedAt.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

}
