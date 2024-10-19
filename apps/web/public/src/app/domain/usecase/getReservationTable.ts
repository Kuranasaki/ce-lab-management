import getAllReservations from '../../data/repositories/getAllReservation';
import mapper from '../mapper/reservationTableMapper';

export default async function getReservationTable() {
    const rawData = await getAllReservations();
    const mappedData = await mapper(rawData);
    return mappedData;
}
