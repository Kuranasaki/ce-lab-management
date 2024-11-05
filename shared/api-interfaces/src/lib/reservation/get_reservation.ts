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
  orgProjectName: t.String(),
  orgAddress: t.String(),
  orgEmail: t.String(),
  orgPhone: t.String(),
  orgFax: t.String(),
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
