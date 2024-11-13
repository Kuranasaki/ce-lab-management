import axios from 'axios';
import { PricingServiceType } from '@ce-lab-mgmt/services/pricing';
import { App as ReservationServiceType } from '@ce-lab-mgmt/services/reservation';
import { treaty } from '@elysiajs/eden';

// To be config later
export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pricingApi = treaty<PricingServiceType>('http://localhost:3001');
export const reservationApi = treaty<ReservationServiceType>(
  'http://localhost:3000'
);
