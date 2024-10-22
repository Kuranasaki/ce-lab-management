export interface RequestReservationForm {
  orgInfo: OrganizationInfo;
  testInfo: TestInfo;
}

export interface OrganizationInfo {
  orgName: string;
  orgProjectName: string;
  orgAddress: string;
  orgEmail: string;
  orgPhone: string;
  orgFax: string;
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

export interface RequestReservationResponse {
  code: number;
}

import { t } from 'elysia';

export const TestItemSchema = t.Object({
  testID: t.String(),
  testAmount: t.Number(),
  testDetails: t.Optional(t.String()),
  testNote: t.Optional(t.String()),
});

export const TestInfoSchema = t.Object({
  testType: t.String(),
  testList: t.Array(TestItemSchema),
});

export const OrganizationInfoSchema = t.Object({
  orgName: t.String(),
  orgProjectName: t.String(),
  orgAddress: t.String(),
  orgEmail: t.String(),
  orgPhone: t.String(),
  orgFax: t.String(),
});

export const RequestReservationFormSchema = t.Object({
  orgInfo: OrganizationInfoSchema,
  testInfo: TestInfoSchema,
});
