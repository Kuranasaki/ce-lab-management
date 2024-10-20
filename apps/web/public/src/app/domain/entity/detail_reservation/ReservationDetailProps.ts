import { ReservationStatus, ReservationType } from "../../../data/models/Reservation";

export default class ReservationDetailProps {
    id: string | null;
    date: Date;
    type: ReservationType;
    status: ReservationStatus | null;

    constructor(
        id: string | null = null,
        date: Date = new Date(),
        type: ReservationType = ReservationType.One,
        status: ReservationStatus | null = null,
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
