import axios from 'axios';
import { PricingServiceType } from '@ce-lab-mgmt/services/pricing';
import { App as ReservationServiceType } from '@ce-lab-mgmt/services/reservation';
import { treaty } from '@elysiajs/eden';
import { AuthClass } from '../../hooks/tokenClass';

const userId = AuthClass.getUserId();

const endpoint = process.env.VITE_API_URL || 'http://localhost:3000';

// To be config later
export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pricingApi = treaty<PricingServiceType>(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AuthClass.getToken()}`,
    'x-user-id': userId,
    'x-user-roles': 'customer',
  },
});

export const reservationApi = treaty<ReservationServiceType>(
  'http://localhost:3000',
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthClass.getToken()}`,
      'x-user-id': 'bL2qciSODSbddrhgCjQvCRnVC4i2',
      'x-user-roles': 'customer',
    },
  }
);
