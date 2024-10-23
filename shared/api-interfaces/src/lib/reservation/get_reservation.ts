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
    Canceled = 'canceled'
}

interface GetReservationResponse {
    reservationID: string;
    orgInfo: OrganizationInfo;
    testInfo: TestInfo;
    status: ReservationStatus;
    totalPrice: number;
    createdOn: Date;
}

export { GetReservationResponse, ReservationStatus }

import { t } from 'elysia';

const TestItemSchema = t.Object({
    testID: t.String(),
    testName: t.String(),
    testAmount: t.Number(),
    testPricePerUnit: t.Number(),
    testUnit: t.String(),
    testDetails: t.Optional(t.String()),
    testNote: t.Optional(t.String()),
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

export { GetReservationSchema }