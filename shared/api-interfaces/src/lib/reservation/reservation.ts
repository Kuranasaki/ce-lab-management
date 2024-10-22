import { t } from 'elysia'

export const OrgDataSchema = t.Object({
  orgName: t.String(),
  orgProjectName: t.String(),
  orgAddress: t.String(),
  orgPhone: t.String(),
  orgEmail: t.String(),
  orgFax: t.String(),
})

export const TestItemSchema = t.Object({
  testID: t.String(),
  testAmount: t.Number(),
  testDetails: t.String(),
  testNote: t.String(),
})

export const TestListSchema = t.Object({
  testType: t.String(),
  testItems: t.Array(TestItemSchema),
})

export const RequestReservationSchema = t.Object({
  orgData: OrgDataSchema,
  testList: TestListSchema,
})