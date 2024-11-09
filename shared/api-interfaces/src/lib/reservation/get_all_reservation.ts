type GetAllReservationResponse = GetReservationResponse[];

export { GetAllReservationResponse };

import { t } from 'elysia';
import {
  GetReservationResponse,
  GetReservationSchema,
} from './get_reservation';

const GetAllReservationSchema = t.Array(GetReservationSchema);

export { GetAllReservationSchema };
