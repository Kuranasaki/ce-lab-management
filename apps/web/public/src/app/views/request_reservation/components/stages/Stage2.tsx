import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ce-lab-mgmt/shared-ui';
import { PlusIcon } from '@radix-ui/react-icons';
import { Dialog } from '@radix-ui/react-dialog';
import AddEditItemDialog from './AddEditItemDialog';
import { useEffect, useState } from 'react';
import { useTestItemForm } from '../../../../hooks/request_reservation/useTestItemForm';
import TestListTableProps from '../../../../domain/entity/view_reservation_detail/TestListTableProps';
import TestListTableItemProps from '../../../../domain/entity/view_reservation_detail/TestListTableItemProps';
import TestList from '../../../view_reservation_detail/components/TestList';
import { ReservationType } from '@ce-lab-mgmt/api-interfaces';
import { PricingListProps } from '../../../../domain/entity/request_reservation/pricingListProps';
import { TestListFormReturned } from '../../../../domain/entity/request_reservation/reqReservRequestFormEntity';

export default function Stage2({
  testListForm,
  pricingList,
  setStage,
}: {
  testListForm: TestListFormReturned;
  pricingList: PricingListProps;
  setStage: (stage: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const { testItemForm } = useTestItemForm();

  const testTypeDisplayName = {
    [ReservationType.One]: 'การทดสอบวัสดุ',
    [ReservationType.Two]: 'การทดสอบเทียบ',
    [ReservationType.Three]: 'การทดสอบการทนไฟ',
  };

  useEffect(() => {
    testListForm.watch('testList');
    testListForm.watch('testType');
  }, [testListForm]);

  function handleDialogSubmit() {
    if (editIndex === -1) {
      testListForm.setValue('testList', [
        ...testListForm.getValues('testList'),
        testItemForm.getValues(),
      ]);
    } else {
      const updatedTestList = testListForm.getValues('testList');
      updatedTestList[editIndex] = testItemForm.getValues();
      testListForm.setValue('testList', updatedTestList);
      setEditIndex(-1);
    }
    testItemForm.reset();
    setOpen(false);
  }

  function handleOpenEditDialog(index: number) {
    setEditIndex(index);
    testItemForm.reset();
    const testItem = testListForm.getValues('testList')[index];
    testItemForm.setValue('testID', testItem.testID);
    testItemForm.setValue('testName', testItem.testName);
    testItemForm.setValue('testSubName', testItem.testSubName);
    testItemForm.setValue('testAmount', testItem.testAmount);
    testItemForm.setValue('testDetails', testItem.testDetails);
    testItemForm.setValue('testNote', testItem.testNote);
    setOpen(true);
  }

  function handleDeleteTestItem(index: number) {
    const updatedTestList = testListForm
      .getValues('testList')
      .filter((_, i) => i !== index);
    testListForm.setValue('testList', updatedTestList, {
      shouldValidate: true,
      shouldDirty: true,
    });
    testListForm.trigger('testList');
  }

  return (
    <Form {...testListForm}>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-6 w-full">
          {/* Select Test Type */}
          <div className="flex flex-col gap-4 w-full">
            <h4>ประเภทการทดสอบ</h4>
            <FormField
              control={testListForm.control}
              name="testType"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);
                      testListForm.setValue('testList', []);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={
                          testListForm.getFieldState('testType').error &&
                          'ring-1 ring-error-500'
                        }
                      >
                        <SelectValue placeholder="เลือกประเภทการทดสอบ" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ReservationType.One}>
                        {testTypeDisplayName[ReservationType.One]}
                      </SelectItem>
                      <SelectItem value={ReservationType.Two}>
                        {testTypeDisplayName[ReservationType.Two]}
                      </SelectItem>
                      <SelectItem value={ReservationType.Three}>
                        {testTypeDisplayName[ReservationType.Three]}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <p className="text-error-500">
              *หากท่านแก้ไขประเภทการทดสอบ ข้อมูลรายการทดสอบในตาราจะถูกรีเซ็ต
            </p>
          </div>

          {/* Test List */}
          {testListForm.getFieldState('testType').isDirty && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <h4>รายการทดสอบ</h4>
                <Button
                  onClick={() => {
                    testItemForm.reset();
                    setOpen(true);
                  }}
                >
                  <PlusIcon className="stroke-slate-50" />
                  เพิ่ม
                </Button>
              </div>

              <TestList
                data={
                  new TestListTableProps(
                    testListForm.getValues('testList').map((item, index) => {
                      const name =
                        item.testName === 'อื่น ๆ'
                          ? item.testSubName
                          : item.testName + ': ' + item.testSubName;

                      const priceperunitItem = pricingList.categoryTestList
                        .get(testListForm.getValues('testType'))
                        ?.testItems.get(item.testName)
                        ?.find(
                          (testItem) => testItem.subName === item.testSubName
                        );
                      let priceperunit = 0;
                      if (priceperunitItem !== undefined) {
                        const idx =
                          priceperunitItem.prices.length > 1
                            ? priceperunitItem.prices.findIndex(
                                (price) => price.amount === item.testAmount
                              )
                            : 0;
                        priceperunit = priceperunitItem.prices[idx].price;
                      }

                      const unit =
                        pricingList.categoryTestList
                          .get(testListForm.getValues('testType'))
                          ?.testItems.get(item.testName)
                          ?.find(
                            (testItem) => testItem.subName === item.testSubName
                          )?.prices[0].unit || '';

                      return new TestListTableItemProps(
                        index.toString(),
                        name,
                        priceperunit,
                        item.testAmount,
                        unit,
                        item.testDetails,
                        item.testNote
                      );
                    }),
                    testListForm.getValues('testList').reduce((acc, item) => {
                      const itemTemp = pricingList.categoryTestList
                        .get(testListForm.getValues('testType'))
                        ?.testItems.get(item.testName)
                        ?.find((testItem) => testItem.id === item.testID);

                      const totalPrice =
                        (itemTemp
                          ? itemTemp?.prices.length > 1
                            ? itemTemp?.prices.find(
                                (price) => price.amount === item.testAmount
                              )?.price
                            : itemTemp?.prices[0].price * item.testAmount
                          : 0) || 0;

                      return acc + totalPrice;
                    }, 0)
                  )
                }
                handleEditTest={handleOpenEditDialog}
                handleDeleteTest={handleDeleteTestItem}
                editable
              />
            </div>
          )}
        </div>

        {/* Test Item Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <AddEditItemDialog
            isAdd={editIndex === -1}
            testType={testListForm.getValues('testType')}
            pricingList={
              pricingList ||
              new PricingListProps({ categoryTestList: new Map() })
            }
            testItemForm={testItemForm}
            onSubmit={handleDialogSubmit}
            setOpen={setOpen}
          />
        </Dialog>

        {/* Back & Next */}
        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-row justify-end w-full gap-2">
            <Button variant="outline" onClick={() => setStage(1)}>
              ย้อนกลับ
            </Button>
            <Button
              type="submit"
              onClick={testListForm.handleSubmit(() => setStage(3))}
            >
              ต่อไป
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}
