interface TestItem {
  testID: string;
  testName: string;
  testAmount: number;
  testPricePerUnit: number;
  testUnit: string;
  testDetails?: string;
  testNote?: string;
}

interface TestInfo {
  testType: string;
  testList: TestItem[];
}

interface OrganizationInfo {
  orgName: string;
  orgProjectName?: string;
  orgAddress: string;
  orgEmail: string;
  orgPhone: string;
  orgFax?: string;
}

enum ReservationStatus {
  Pending = 'pending',
  Processing = 'processing',
  Success = 'success',
  Canceled = 'canceled',
}

enum ReservationType {
  One = '1',
  Two = '2',
  Three = '3',
}

interface GetReservationResponse {
  reservationID: string;
  orgInfo: OrganizationInfo;
  testInfo: TestInfo;
  status: ReservationStatus;
  totalPrice: number;
  createdOn: Date;
}

export { GetReservationResponse, ReservationStatus, ReservationType };

import { t } from 'elysia';

const TestItemSchema = t.Object({
  testID: t.String(),
  testItemID: t.String(),
  testName: t.String(),
  testAmount: t.Number(),
  testPricePerUnit: t.Number(),
  testUnit: t.String(),
  testDetails: t.Nullable(t.String()),
  testNote: t.Nullable(t.String()),

  // Experiment data
  assignedProfessorName: t.Nullable(t.String()),
  markedAsDone: t.Nullable(t.Boolean()), // Null If not apprpoved yet (no experiment)
  certificateUploadedAt: t.Nullable(t.Date()),
});

const TestInfoSchema = t.Object({
  testType: t.String(),
  testList: t.Array(TestItemSchema),
});

const OrganizationInfoSchema = t.Object({
  orgName: t.String(),
  orgProjectName: t.Optional(t.String()),
  orgAddress: t.String(),
  orgEmail: t.String(),
  orgPhone: t.String(),
  orgFax: t.Optional(t.String()),
});

const GetReservationSchema = t.Object({
  reservationID: t.String(),
  orgInfo: OrganizationInfoSchema,
  testInfo: TestInfoSchema,
  Status: t.Enum({
    Pending: 'pending',
    Processing: 'processing',
    Success: 'success',
    Canceled: 'canceled',
  }),
  totalPrice: t.Number(),
  CreatedOn: t.Date(),
});

export { GetReservationSchema };
