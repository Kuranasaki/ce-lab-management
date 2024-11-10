export interface RequestReservationForm {
  orgInfo: OrganizationInfo;
  testInfo: RequestTestInfo;
}

export interface OrganizationInfo {
  orgName: string;
  orgProjectName?: string;
  orgAddress: string;
  orgEmail: string;
  orgPhone: string;
  orgFax?: string;
}

export interface RequestTestInfo {
  testType: string;
  testList: RequestTestItem[];
}

export interface TestInfo {
  testType: string;
  testList: TestItem[];
}

export interface RequestTestItem {
  testID: string;
  testAmount: number;
  testDetails: string | null;
  testNote: string | null;
}

export interface TestItem {
  testItemID: string;
  testName: string;
  testAmount: number;
  testUnit: string;
  testDetails: string | null;
  testNote: string | null;
  testTotalPrice: number;
  assignedProfessorName: string | null;
  markedAsDone: boolean | null;
  certificateUploadedAt: Date | null;
}

export interface RequestReservationResponse {
  code: number;
}

import { t } from 'elysia';

export const RequestTestItemSchema = t.Object({
  testID: t.String(),
  testAmount: t.Number(),
  testDetails: t.Nullable(t.String()),
  testNote: t.Nullable(t.String()),
});

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

export const RequestTestInfoSchema = t.Object({
  testType: t.String(),
  testList: t.Array(RequestTestItemSchema),
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
  testInfo: RequestTestInfoSchema,
});
