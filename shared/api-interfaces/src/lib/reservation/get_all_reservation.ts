import { t } from 'elysia';
import { Reservation, ReservationSchema } from './reservation';

type GetAllReservationResponse = Reservation[];

export { GetAllReservationResponse };


const GetAllReservationSchema = t.Array(ReservationSchema);

export { GetAllReservationSchema };
