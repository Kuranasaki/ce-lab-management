import {
  BaseResponse,
  GetAllReservationResponse,
} from '@ce-lab-mgmt/api-interfaces';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import ReservationTableItemProps from '../../entity/view_reservation/reservationTableItemProps';

export default async function reservationTableMapper(
  rawData: BaseResponse<GetAllReservationResponse>
): Promise<ReservationTableItemProps[] | ToastEntity> {
  if (rawData.error) {
    return ToastEntity.fromCode(rawData.error.code ?? 500);
  }

  if (!rawData.data) {
    return ToastEntity.unknownError();
  }

  const reservations: ReservationTableItemProps[] = rawData.data.map(
    (reservation) => {
      return new ReservationTableItemProps(
        reservation.id,
        new Date(reservation.createdAt),
        reservation.testInfo.testType,
        reservation.status,
        reservation.totalPrice,
        reservation.testInfo
      );
    }
  );

  return reservations;
}
