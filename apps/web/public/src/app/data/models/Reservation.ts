export enum ReservationType {
  One = '1',
  Two = '2',
  Three = '3',
}

export enum ReservationStatus {
  Pending = 'pending',
  Processing = 'processing',
  Success = 'success',
  Canceled = 'canceled',
}

// Update the Reservation type to use these enums
export type Reservation = {
  id: string;
  date: Date;
  type: ReservationType;
  status: ReservationStatus;
  amount: number;
};
