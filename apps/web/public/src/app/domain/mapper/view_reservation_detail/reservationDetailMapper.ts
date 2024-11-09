import { BaseResponse, GetReservationResponse } from '@ce-lab-mgmt/api-interfaces';
import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import CustomerDetailProps from '../../entity/view_reservation_detail/CustomerDetailProps';
import ReservationDetailProps from '../../entity/view_reservation_detail/ReservationDetailProps';
import TestListTableProps from '../../entity/view_reservation_detail/TestListTableProps';
import TestListTableItemProps from '../../entity/view_reservation_detail/TestListTableItemProps';

export default async function reservationDetailMapper(
    rawData: BaseResponse<GetReservationResponse>
): Promise<{
    customer: CustomerDetailProps,
    reservationDetail: ReservationDetailProps,
    testList: TestListTableProps
} | ToastEntity> {
    if (rawData.error) {
        return ToastEntity.fromCode(rawData.error.code);
    }

    if (!rawData.data) {
        return ToastEntity.unknownError();
    }

    const orgInfo = rawData.data.orgInfo;
    const testInfo = rawData.data.testInfo;

    const reservationDetail = {
        customer: new CustomerDetailProps(
            orgInfo.orgName,
            orgInfo.orgProjectName,
            orgInfo.orgAddress,
            orgInfo.orgEmail,
            orgInfo.orgPhone,
            orgInfo.orgFax
        ),
        reservationDetail: new ReservationDetailProps({
            id: rawData.data.reservationID,
            date: rawData.data.createdOn,
            status: rawData.data.status,
            type: testInfo.testType
        }),
        testList: new TestListTableProps(
            testInfo.testList.map((test) =>
                new TestListTableItemProps(
                    test.testID,
                    test.testName,
                    test.testPricePerUnit,
                    test.testAmount,
                    test.testUnit,
                    test.testDetails || null,
                    test.testNote || null
                )
            )
        )
    };

    return reservationDetail;
}