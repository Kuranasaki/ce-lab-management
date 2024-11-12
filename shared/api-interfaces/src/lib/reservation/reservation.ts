import { Static, t } from 'elysia';

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

// /***
//  *  @deprecated
//  *
//  **/
export const TestListSchema = t.Object({
  testType: t.String(),
  testList: t.Array(TestItemSchema),
});

export type OrganizationInfo = Static<typeof OrganizationInfoSchema>;

export type TestInfo = Static<typeof TestInfoSchema>;

export type TestItem = Static<typeof TestItemSchema>;

export type TestList = Static<typeof TestListSchema>;

export enum ReservationStatus {
  Pending = 'pending',
  Processing = 'processing',
  Success = 'success',
  Canceled = 'canceled',
}

export enum ReservationType {
  One = '1',
  Two = '2',
  Three = '3',
}

export const ReservationStatusSchema = t.Enum(ReservationStatus);

export const ReservationSchema = t.Object({
  id: t.String({ format: 'uuid' }),
  customerId: t.String({ format: 'uuid' }),
  orgData: OrganizationInfoSchema,
  testInfo: TestInfoSchema,
  notes: t.Optional(t.String()),
  status: ReservationStatusSchema,
  totalPrice: t.Number({ default: 0 }),
  createdAt: t.String({ format: 'date-time' }),
  updatedAt: t.String({ format: 'date-time' }),
});

export type Reservation = Static<typeof ReservationSchema>;
