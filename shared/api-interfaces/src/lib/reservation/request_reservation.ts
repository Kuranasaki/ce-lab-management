
import { t } from 'elysia';
import { OrganizationInfo, OrganizationInfoSchema, TestListSchema, TestList } from './reservation';

export interface RequestReservationForm {
  orgInfo: OrganizationInfo;
  testInfo: TestList;
}

export interface RequestReservationResponse {
  code: number;
}



export const RequestReservationFormSchema = t.Object({
  orgInfo: OrganizationInfoSchema,
  testInfo: TestListSchema,
});
