import { BaseResponse } from '@ce-lab-mgmt/api-interfaces';
import { api } from '../axios/api';
import { AxiosError } from 'axios';
import { Reservation } from '../models/Reservation';

export default async function getAllReservations(): Promise<
    BaseResponse<Reservation[]>
> {
    try {
        // const response = await api.get<BaseResponse<Reservation[]>>('/reservations');
        
        const mockReservations: Reservation[] = [
            {
                id: "m5gr84i8",
                date: new Date(),
                type: "one",
                status: "pending",
                amount: 3000,
            },
            {
                id: "m5gr84i9",
                date: new Date(),
                type: "two",
                status: "success",
                amount: 5000,
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