import { Button } from '@ce-lab-mgmt/shared-ui';
import { ReservationType } from '../../../../data/models/Reservation';
import CustomerDetailProps from '../../../../domain/entity/view_reservation_detail/CustomerDetailProps';
import ReservationDetailProps from '../../../../domain/entity/view_reservation_detail/ReservationDetailProps';
import TestListTableProps from '../../../../domain/entity/view_reservation_detail/TestListTableProps';
import TestListTableItemProps from '../../../../domain/entity/view_reservation_detail/TestListTableItemProps';
import { OrgInfoForm } from '../../../../hooks/request_reservation/useOrgInfoForm';
import { TestListForm } from '../../../../hooks/request_reservation/useTestListForm';
import CustomerDetail from '../../../view_reservation_detail/components/CustomerDetail';
import ReservationDetail from '../../../view_reservation_detail/components/ReservationDetail';
import TestList from '../../../view_reservation_detail/components/TestList';
import {
  OrgDataEntity,
  RequestReservationEntity,
  TestListEntity,
} from '../../../../domain/entity/request_reservation/reqReservRequestEntity';
import { PricingListProps } from '../../../../domain/entity/request_reservation/pricingListProps';

export default function Stage3({
  orgForm,
  testListForm,
  pricingList,
  setStage,
  post,
}: {
  orgForm: OrgInfoForm;
  testListForm: TestListForm;
  pricingList: PricingListProps | null;
  setStage: (stage: number) => void;
  post: (data: RequestReservationEntity) => void;
}) {
  function handleSubmit() {
    post(
      new RequestReservationEntity({
        orgData: new OrgDataEntity({ ...orgForm.getValues() }),
        testList: new TestListEntity({
          testType: testListForm.getValues('testType'),
          testItems: [...testListForm.getValues('testList')],
        }),
      })
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4">
        <h4>ข้อมูลผู้ขอรับบริการทดสอบ</h4>
        <CustomerDetail
          data={
            new CustomerDetailProps(
              orgForm.getValues('orgName'),
              orgForm.getValues('orgProjectName'),
              orgForm.getValues('orgAddress'),
              orgForm.getValues('orgEmail'),
              orgForm.getValues('orgPhone'),
              orgForm.getValues('orgFax')
            )
          }
        />
      </div>
      <div className="flex flex-col gap-4">
        <h4>ข้อมูลคำขอรับบริการทดสอบ</h4>
        <ReservationDetail
          data={
            new ReservationDetailProps({
              type: testListForm.getValues('testType') as ReservationType,
            })
          }
        />
      </div>
      <div className="flex flex-col gap-4">
        <h4>รายการทดสอบ</h4>
        <TestList
          data={
            new TestListTableProps(
              testListForm.getValues('testList').map(
                (item, index) =>
                  new TestListTableItemProps(
                    index.toString(),
                    item.testName + ': ' + item.testSubName,
                    pricingList?.categoryTestList
                      .get(testListForm.getValues('testType'))
                      ?.testItems.get(item.testName)
                      ?.find(
                        (testItem) => testItem.subName === item.testSubName
                      )?.pricePerUnit || 0,

                    item.testAmount,
                    pricingList?.categoryTestList
                      .get(testListForm.getValues('testType'))
                      ?.testItems.get(item.testName)
                      ?.find(
                        (testItem) => testItem.subName === item.testSubName
                      )?.unit || '',
                    item.testDetails,
                    item.testNote
                  )
              ),
              testListForm.getValues('testList').reduce(
                (acc, item) =>
                  acc +
                  (pricingList?.categoryTestList
                    .get(testListForm.getValues('testType'))
                    ?.testItems.get(item.testName)
                    ?.find((testItem) => testItem.id === item.testID)
                    ?.pricePerUnit || 0) *
                    item.testAmount,
                0
              )
            )
          }
        />
      </div>
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-row justify-end w-full gap-2">
          <Button variant="outline" onClick={() => setStage(2)}>
            ย้อนกลับ
          </Button>
          <Button variant="accept" onClick={handleSubmit}>
            ส่งคำขอรับบริการ
          </Button>
        </div>
      </div>
    </div>
  );
}
