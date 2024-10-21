import { t } from 'elysia';

const GetAllReservationSchema = t.Object({
    reservationID: t.String(),
    Status: t.Enum({
        Pending: 'pending',
        Processing: 'processing',
        Success: 'success',
        Canceled: 'canceled',
    }),
    testType: t.String(),
    CreatedOn: t.Date(),
});

export { GetAllReservationSchema }