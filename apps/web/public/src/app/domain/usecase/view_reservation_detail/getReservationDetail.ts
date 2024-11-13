import getReservation from '../../../data/repositories/view_reservation/getReservation';
import reservationDetailMapper from '../../mapper/view_reservation_detail/reservationDetailMapper';

export default async function getReservationDetail(id: string) {
    const rawData = await getReservation(id);
    const mappedData = await reservationDetailMapper(rawData);
    return mappedData;
}
