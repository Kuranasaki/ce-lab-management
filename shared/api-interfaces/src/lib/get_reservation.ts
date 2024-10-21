import { t } from 'elysia';

const TestItemSchema = t.Object({
    testID: t.String(),
    testName: t.String(),
    testAmount: t.Number(),
    testPrice: t.Number(),
    testPricePerUnit: t.Number(),
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

const GetReservationSchema = t.Object({
    orgInfo: OrganizationInfoSchema,
    testInfo: TestInfoSchema,
    Status: t.Enum({
        Pending: 'pending',
        Processing: 'processing',
        Success: 'success',
        Canceled: 'canceled',
    }),
    CreatedOn: t.Date(),
});

export { GetReservationSchema }