import { BaseResponse } from '@ce-lab-mgmt/api-interfaces';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import ReservationTableItem from '../entity/reservationTableItem';
import { Reservation } from '../../data/models/Reservation';

export default async function mapper(
    rawData: BaseResponse<Reservation[]>
): Promise<ReservationTableItem[] | ToastEntity> {
    if (rawData.error) {
        return ToastEntity.fromCode(rawData.error.code);
    }

    if (!rawData.data) {
        return ToastEntity.unknownError();
    }

    const reservations: ReservationTableItem[] = rawData.data.map(reservation => {
        return new ReservationTableItem(
            reservation.id,
            new Date(reservation.date),  
            reservation.type,             
            reservation.status,           
            reservation.amount            
        );
    });

    return reservations; 
}
