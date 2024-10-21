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

import { t } from 'elysia';

const TestItemSchema = t.Object({
  testID: t.String(),
  testAmount: t.Number(),
  testDetails: t.Optional(t.String()),
  testNote: t.Optional(t.String()),
});

const TestInfoSchema = t.Object({
  testType: t.String(),
  testList: t.Array(TestItemSchema),
});

const OrganizationInfoSchema = t.Object({
  orgName: t.String(),
  orgProjectName: t.String(),
  orgAddress: t.String(),
  orgEmail: t.String(),
  orgPhone: t.String(),
  orgFax: t.String(),
});

const RequestReservationFormSchema = t.Object({
  orgInfo: OrganizationInfoSchema,
  testInfo: TestInfoSchema,
});
