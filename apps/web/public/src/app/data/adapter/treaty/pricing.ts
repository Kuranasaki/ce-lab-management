import { treaty } from '@elysiajs/eden';
import { PricingApp } from '@ce-lab-mgmt/svc/pricing';

export const pricing = treaty<PricingApp>(import.meta.env.VITE_BACKEND_URL);
