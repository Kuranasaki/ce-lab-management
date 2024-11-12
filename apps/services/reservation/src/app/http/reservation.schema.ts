import { t as Type } from 'elysia';


export const UpdateReservationSchema = Type.Object({
  notes: Type.String(),
});

export type UpdateReservationDTO = typeof UpdateReservationSchema.static

