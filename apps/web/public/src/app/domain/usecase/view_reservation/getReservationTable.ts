import getAllReservations from '../../../data/repositories/view_reservation/getAllReservation';
import reservationTableMapper from '../../mapper/view_reservation/reservationTableMapper';

export default async function getReservationTable() {
  const rawData = await getAllReservations();
  const mappedData = await reservationTableMapper(rawData);
  return mappedData;
}
