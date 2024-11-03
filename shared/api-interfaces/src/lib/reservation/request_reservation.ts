import { t } from 'elysia';
import { TestItemSchema } from './reservation';

export interface RequestReservationForm {
  orgInfo: OrganizationInfo;
  testInfo: TestInfo;
}

export interface OrganizationInfo {
  orgName: string;
  orgProjectName?: string;
  orgAddress: string;
  orgEmail: string;
  orgPhone: string;
  orgFax?: string;
}

export interface TestInfo {
  testType: string;
  testList: TestItem[];
}

export interface TestItem {
  testID: string;
  testAmount: number;
  testDetails?: string;
  testNote?: string;
}

export const TestInfoSchema = t.Object({
  testType: t.String(),
  testList: t.Array(TestItemSchema),
});

export const OrganizationInfoSchema = t.Object({
  orgName: t.String(),
  orgProjectName: t.Optional(t.String()),
  orgAddress: t.String(),
  orgEmail: t.String(),
  orgPhone: t.String(),
  orgFax: t.Optional(t.String()),
});

/*
Request
- POST /reservation
- Body: RequestReservationFormSchema
- Header: authorization: Barear token
*/

export const RequestReservationFormSchema = t.Object({
  orgInfo: OrganizationInfoSchema,
  testInfo: TestInfoSchema,
});

export const ResponseReservationSchema = t.Object({
  reservationId: t.String(),
});

/*
Response
- Success -> Status: 200, Body: ResponseReservationSchema
- Missing Field -> Status: 400
- Unauthorized -> Status: 401
 */
