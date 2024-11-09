import { BaseResponse, GetAllReservationResponse } from '@ce-lab-mgmt/api-interfaces';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import ReservationTableItemProps from '../../entity/view_reservation/reservationTableItemProps';

export default async function reservationTableMapper(
  rawData: BaseResponse<GetAllReservationResponse>
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
        reservation.reservationID,
        new Date(reservation.CreatedOn),
        reservation.testType,
        reservation.Status,
        reservation.totalPrice
      );
    }
  );

  return reservations;
}
