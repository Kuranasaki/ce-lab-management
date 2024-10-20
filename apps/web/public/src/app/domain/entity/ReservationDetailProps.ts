import { ReservationType, ReservationStatus } from "../../data/models/Reservation";

export default class ReservationDetailProps {
    id: string;
    date: Date;
    type: ReservationType;
    status: ReservationStatus;

    constructor(
        id: string = "default-id",
        date: Date = new Date(),
        type: ReservationType = ReservationType.One,
        status: ReservationStatus = ReservationStatus.Pending
    ) {
        this.id = id;
        this.date = date;
        this.type = type;
        this.status = status;
    }

    formatDate(): string {
        return this.date.toLocaleDateString("th-TH", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

}
