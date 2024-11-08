import { ReservationStatus } from "@ce-lab-mgmt/api-interfaces";

export default class ReservationTableItemProps {
  id: string;
  date: Date;
  type: string;
  status: ReservationStatus;
  amount: number;

  constructor(
    id: string,
    date: Date,
    type: string,
    status: ReservationStatus,
    amount: number
  ) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.status = status;
    this.amount = amount;
  }

  formatDate(): string {
    return this.date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  formatAmount(): string {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(this.amount);
  }
}
