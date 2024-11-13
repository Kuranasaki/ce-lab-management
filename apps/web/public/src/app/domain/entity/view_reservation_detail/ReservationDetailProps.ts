import {
  ReservationStatus,
  ReservationType,
} from '@ce-lab-mgmt/api-interfaces';

export default class ReservationDetailProps {
  id?: string;
  date: Date;
  type: ReservationType;
  status?: ReservationStatus;

  constructor({
    id,
    date = new Date(),
    type = ReservationType.One,
    status,
  }: {
    id?: string;
    date?: Date;
    type?: ReservationType;
    status?: ReservationStatus;
  }) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.status = status;
  }

  formatDate(): string {
    return new Date(this.date).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
