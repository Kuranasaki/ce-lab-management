import { BaseResponse } from '@ce-lab-mgmt/api-interfaces';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import { Reservation } from '../../../data/models/Reservation';
import ReservationTableItemProps from '../../entity/view_reservation/reservationTableItemProps';

export default async function reservationTableMapper(
  rawData: BaseResponse<Reservation[]>
): Promise<ReservationTableItemProps[] | ToastEntity> {
  if (rawData.error) {
    return ToastEntity.fromCode(rawData.error.code);
  }

  if (!rawData.data) {
    return ToastEntity.unknownError();
  }

  const reservations: ReservationTableItemProps[] = rawData.data.map(
    (reservation) => {
      return new ReservationTableItemProps(
        reservation.id,
        new Date(reservation.date),
        reservation.type,
        reservation.status,
        reservation.amount
      );
    }
  );

  return reservations;
}
