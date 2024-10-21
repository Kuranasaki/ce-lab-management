import { t } from 'elysia';

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
