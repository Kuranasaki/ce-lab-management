interface Reservation {
    reservationID: string,
    Status: ReservationStatus,
    testType: string,
    CreatedOn: Date,
    totalPrice: number,
}

type GetAllReservationResponse = Reservation[];

export { GetAllReservationResponse };

import { t } from 'elysia';
import { ReservationStatus } from './get_reservation';

const ReservationSchema = t.Object({
    reservationID: t.String(),
    Status: t.Enum({
        Pending: 'pending',
        Processing: 'processing',
        Success: 'success',
        Canceled: 'canceled',
    }),
    testType: t.String(),
    CreatedOn: t.Date(),
    totalPrice: t.Number(),
});

const GetAllReservationSchema = t.Array(ReservationSchema);

export { GetAllReservationSchema };
