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
  testTotalPrice: number;
}

export interface RequestReservationResponse {
  code: number;
}

import { t } from 'elysia';

export const TestItemSchema = t.Object({
  testItemID: t.String(),
  testName: t.String(),
  testAmount: t.Number(),
  testUnit: t.String(),
  testDetails: t.Nullable(t.String()),
  testNote: t.Nullable(t.String()),
  testTotalPrice: t.Number(),

  // Experiment data
  assignedProfessorName: t.Nullable(t.String()),
  markedAsDone: t.Nullable(t.Boolean()), // Null If not apprpoved yet (no experiment)
  certificateUploadedAt: t.Nullable(t.Date()),
});

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

export const RequestReservationFormSchema = t.Object({
  orgInfo: OrganizationInfoSchema,
  testInfo: TestInfoSchema,
});
