import { BaseResponse } from '@ce-lab-mgmt/api-interfaces';
import { api } from '../adapter/axios';
import { AxiosError } from 'axios';
import {
  Reservation,
  ReservationStatus,
  ReservationType,
} from '../models/Reservation';

export default async function getAllReservations(): Promise<
  BaseResponse<Reservation[]>
> {
  try {
    // const response = await api.get<BaseResponse<Reservation[]>>('/reservations');

    const mockReservations: Reservation[] = [
      {
        id: 'm5gr84i8',
        date: new Date(),
        type: ReservationType.One,
        status: ReservationStatus.Pending,
        amount: 3000,
      },
      {
        id: 'm5gr84i9',
        date: new Date(),
        type: ReservationType.Two,
        status: ReservationStatus.Success,
        amount: 5000,
      },
      {
        id: 'm5gr84i10',
        date: new Date(),
        type: ReservationType.Three,
        status: ReservationStatus.Processing,
        amount: 1000,
      },
      {
        id: 'm5gr84i11',
        date: new Date(),
        type: ReservationType.One,
        status: ReservationStatus.Canceled,
        amount: 2000,
      },
      {
        id: 'm5gr84i12',
        date: new Date(),
        type: ReservationType.Two,
        status: ReservationStatus.Processing,
        amount: 1500,
      },
      {
        id: 'm5gr84i13',
        date: new Date(),
        type: ReservationType.Three,
        status: ReservationStatus.Pending,
        amount: 2500,
      },
      {
        id: 'm5gr84i14',
        date: new Date(),
        type: ReservationType.One,
        status: ReservationStatus.Canceled,
        amount: 1500,
      },
      {
        id: 'm5gr84i15',
        date: new Date(),
        type: ReservationType.Two,
        status: ReservationStatus.Success,
        amount: 4000,
      },
      {
        id: 'm5gr84i16',
        date: new Date(),
        type: ReservationType.Three,
        status: ReservationStatus.Pending,
        amount: 3500,
      },
      {
        id: 'm5gr84i17',
        date: new Date(),
        type: ReservationType.One,
        status: ReservationStatus.Processing,
        amount: 4500,
      },
      {
        id: 'm5gr84i18',
        date: new Date(),
        type: ReservationType.Two,
        status: ReservationStatus.Canceled,
        amount: 500,
      },
      {
        id: 'm5gr84i19',
        date: new Date(),
        type: ReservationType.Three,
        status: ReservationStatus.Success,
        amount: 6000,
      },
      {
        id: 'm5gr84i20',
        date: new Date(),
        type: ReservationType.One,
        status: ReservationStatus.Pending,
        amount: 7000,
      },
      {
        id: 'm5gr84i21',
        date: new Date(),
        type: ReservationType.Two,
        status: ReservationStatus.Processing,
        amount: 8000,
      },
      {
        id: 'm5gr84i22',
        date: new Date(),
        type: ReservationType.Three,
        status: ReservationStatus.Canceled,
        amount: 9000,
      },
      {
        id: 'm5gr84i23',
        date: new Date(),
        type: ReservationType.One,
        status: ReservationStatus.Success,
        amount: 10000,
      },
      {
        id: 'm5gr84i24',
        date: new Date(),
        type: ReservationType.Two,
        status: ReservationStatus.Pending,
        amount: 11000,
      },
    ];

    return new BaseResponse<Reservation[]>({
      data: mockReservations,
    });

    // return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return new BaseResponse({ error: { code: error.response.data.status } });
    }
    return new BaseResponse({ error: { code: 500 } });
  }
}
