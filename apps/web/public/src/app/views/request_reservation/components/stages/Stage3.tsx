import { Button } from '@ce-lab-mgmt/shared-ui';
import { ReservationType } from '../../../../data/models/Reservation';
import CustomerDetailProps from '../../../../domain/entity/view_reservation_detail/CustomerDetailProps';
import ReservationDetailProps from '../../../../domain/entity/view_reservation_detail/ReservationDetailProps';
import TestListTableProps from '../../../../domain/entity/view_reservation_detail/TestListTableProps';
import TestListTableItemProps from '../../../../domain/entity/view_reservation_detail/TestListTableItemProps';
import CustomerDetail from '../../../view_reservation_detail/components/CustomerDetail';
import ReservationDetail from '../../../view_reservation_detail/components/ReservationDetail';
import TestList from '../../../view_reservation_detail/components/TestList';
import { PricingListProps } from '../../../../domain/entity/request_reservation/pricingListProps';
import {
  OrgInfoFormReturned,
  TestListFormReturned,
  TestListFormType,
} from '../../../../domain/entity/request_reservation/reqReservRequestFormEntity';

export default function Stage3({
  orgForm,
  testListForm,
  pricingList,
  setStage,
  post,
}: {
  orgForm: OrgInfoFormReturned;
  testListForm: TestListFormReturned;
  pricingList: PricingListProps;
  setStage: (stage: number) => void;
  post: (data: TestListFormReturned) => void;
}) {
  function handleSubmit() {
    post(testListForm);
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
                    pricingList.categoryTestList
                      .get(testListForm.getValues('testType'))
                      ?.testItems.get(item.testName)
                      ?.find(
                        (testItem) => testItem.subName === item.testSubName
                      )?.pricePerUnit || 0,

                    item.testAmount,
                    pricingList.categoryTestList
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
                  (pricingList.categoryTestList
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
