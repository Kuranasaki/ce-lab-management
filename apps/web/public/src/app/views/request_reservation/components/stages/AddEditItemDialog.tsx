import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  Form,
  FormField,
  FormItem,
  FormControl,
  DialogFooter,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Input,
  FormLabel,
  DialogDescription,
  Textarea,
  FormMessage,
} from '@ce-lab-mgmt/shared-ui';
import { TestItemForm } from '../../../../hooks/request_reservation/useTestItemForm';
import { PricingListProps } from '../../../../domain/entity/request_reservation/pricingListProps';

export default function AddEditItemDialog({
  isAdd,
  testType,
  pricingList,
  testItemForm,
  onSubmit,
  setOpen,
}: {
  isAdd: boolean;
  testType: string;
  pricingList: PricingListProps;
  testItemForm: TestItemForm;
  onSubmit: () => void;
  setOpen: (open: boolean) => void;
}) {
  const selectedTestName = testItemForm.watch('testName');
  const selectedTestSubName = testItemForm.watch('testSubName');

  // Utility to find the selected subName details
  const getTestSubDetails = () => {
    const testItems = pricingList.categoryTestList
      .get(testType)
      ?.testItems.get(selectedTestName);

    return testItems?.find((item) => item.subName === selectedTestSubName);
  };

  const testSubDetails = getTestSubDetails();

  return (
    <DialogContent>
      <Form {...testItemForm}>
        <form onSubmit={testItemForm.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="font-bold">
              {isAdd ? 'เพิ่มรายการทดสอบ' : 'แก้ไขรายการทดสอบ'}
            </DialogTitle>
            <DialogDescription>ระบุรายการทดสอบที่ต้องการ</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col my-4 gap-2">
            {/* Test Name Field */}
            <FormField
              control={testItemForm.control}
              name="testName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        testItemForm.setValue('testSubName', ''); // Reset subName on testName change
                      }}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={
                          testItemForm.getFieldState('testName').error
                            ? 'ring-1 ring-error-500'
                            : ''
                        }
                      >
                        <SelectValue placeholder="เลือกรายการทดสอบ" />
                      </SelectTrigger>
                      <SelectContent>
                        {renderTestNames(pricingList, testType)}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Test SubName Field */}
            {selectedTestName && (
              <FormField
                control={testItemForm.control}
                name="testSubName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(e) => {
                          field.onChange(e);
                          testItemForm.setValue(
                            'testID',
                            pricingList.categoryTestList
                              .get(testType)
                              ?.testItems.get(selectedTestName)
                              ?.find((item) => item.subName === e)?.id || ''
                          );
                        }}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={
                            testItemForm.getFieldState('testSubName').error
                              ? 'ring-1 ring-error-500'
                              : ''
                          }
                        >
                          <SelectValue placeholder="เลือกรายการทดสอบย่อย" />
                        </SelectTrigger>
                        <SelectContent>
                          {renderTestSubNames(
                            pricingList,
                            testType,
                            selectedTestName
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {/* Test SubName Details */}
            {testSubDetails && (
              <div className="flex flex-col gap-3 p-3">
                {renderTestDetails(testSubDetails)}
              </div>
            )}

            {/* Test Amount Field */}
            {testSubDetails && (
              <FormField
                control={testItemForm.control}
                name="testAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>จำนวนหน่วยที่ต้องการ</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          testItemForm.getFieldState('testAmount').error
                            ? 'ring-1 ring-error-500'
                            : ''
                        }
                        placeholder="ระบุจำนวนหน่วย (บังคับ)"
                        onChange={(e) =>
                          field.onChange(sanitizeNumberInput(e.target.value))
                        }
                        value={field.value ? String(field.value) : ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Test Details & Notes Fields */}
            {testSubDetails && renderTextAreaFields(testItemForm)}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="reset"
              onClick={() => setOpen(false)}
            >
              ยกเลิก
            </Button>
            <Button variant="accept" type="submit">
              {isAdd ? 'เพิ่มรายการ' : 'บันทึกการเปลี่ยนแปลง'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

/* Helper functions */

// Render test names in the select options
const renderTestNames = (pricingList: PricingListProps, testType: string) =>
  Array.from(
    pricingList.categoryTestList.get(testType)?.testItems.keys() || []
  ).map((testName) => (
    <SelectItem key={testName} value={testName}>
      {testName}
    </SelectItem>
  ));

// Render test sub-names in the select options
const renderTestSubNames = (
  pricingList: PricingListProps,
  testType: string,
  testName: string
) =>
  pricingList.categoryTestList
    .get(testType)
    ?.testItems.get(testName)
    ?.map((testSubName) => (
      <SelectItem key={testSubName.subName} value={testSubName.subName}>
        {testSubName.subName}
      </SelectItem>
    )) || [];

// Render test details such as price and unit
const renderTestDetails = (testSubDetails: any) => (
  <>
    <div className="flex flex-row gap-2">
      <p className="font-bold">ราคาต่อหน่วย:</p>
      <p>{testSubDetails.pricePerUnit} บาท</p>
    </div>
    <div className="flex flex-row gap-2">
      <p className="font-bold">หน่วยเป็น:</p>
      <p>{testSubDetails.unit}</p>
    </div>
  </>
);

// Render Textarea fields for test details and notes
const renderTextAreaFields = (testItemForm: TestItemForm) => (
  <>
    <FormField
      control={testItemForm.control}
      name="testDetails"
      render={({ field }) => (
        <FormItem>
          <FormLabel>รายละเอียด</FormLabel>
          <FormControl>
            <Textarea
              className={
                testItemForm.getFieldState('testDetails').error
                  ? 'ring-1 ring-error-500'
                  : ''
              }
              placeholder="ระบุรายละเอียด (ถ้ามี)"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={testItemForm.control}
      name="testNote"
      render={({ field }) => (
        <FormItem>
          <FormLabel>หมายเหตุ</FormLabel>
          <FormControl>
            <Textarea
              className={
                testItemForm.getFieldState('testNote').error
                  ? 'ring-1 ring-error-500'
                  : ''
              }
              placeholder="ระบุหมายเหตุ (ถ้ามี)"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

// Sanitize number input (remove non-numeric characters)
const sanitizeNumberInput = (value: string) =>
  value.replace(/\D/g, '') ? Number(value.replace(/\D/g, '')) : '';
