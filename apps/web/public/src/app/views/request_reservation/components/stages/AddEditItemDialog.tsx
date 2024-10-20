import {
  DialogHeader,
  DialogContent,
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
import { DialogTitle } from '@radix-ui/react-dialog';
import { TestItemForm } from '../../../../hooks/request_reservation/useTestItemForm';

export default function AddEditItemDialog({
  isAdd,
  testItemForm,
  onSubmit,
}: {
  isAdd: boolean;
  testItemForm: TestItemForm;
  onSubmit: () => void;
}) {
  return (
    <DialogContent>
      <Form {...testItemForm}>
        <form
          onSubmit={testItemForm.handleSubmit(() => {
            onSubmit();
          })}
        >
          <DialogHeader>
            <DialogTitle className="font-bold">
              {isAdd ? 'เพิ่มรายการทดสอบ' : 'แก้ไขรายการทดสอบ'}
            </DialogTitle>
            <DialogDescription>ระบุรายการทดสอบที่ต้องการ</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col my-4 gap-2">
            <FormField
              control={testItemForm.control}
              name="testName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={
                          testItemForm.getFieldState('testName').error &&
                          'ring-1 ring-error-500'
                        }
                      >
                        <SelectValue placeholder="เลือกรายการทดสอบ" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* To be replace with actual data */}
                        <SelectItem value="test1">Test 1</SelectItem>
                        <SelectItem value="test2">Test 2</SelectItem>
                        <SelectItem value="test3">Test 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            {testItemForm.getValues('testName') && (
              <FormField
                control={testItemForm.control}
                name="testSubName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={
                            testItemForm.getFieldState('testSubName').error &&
                            'ring-1 ring-error-500'
                          }
                        >
                          <SelectValue placeholder="เลือกรายการทดสอบย่อย" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* To be replace with actual data */}
                          <SelectItem value="Test 3.1">Test 3.1</SelectItem>
                          <SelectItem value="Test 3.2">Test 3.2</SelectItem>
                          <SelectItem value="Test 3.3">Test 3.3</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {testItemForm.getValues('testSubName') && (
              <>
                <div className="flex flex-col gap-3 p-3">
                  <div className="flex flex-row gap-2">
                    <p className="font-bold">ราคาต่อหน่วย:</p>
                    <p>5000.00 บาท</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="font-bold">หน่วยเป็น:</p>
                    <p>ชุด</p>
                  </div>
                </div>
                <FormField
                  control={testItemForm.control}
                  name="testAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>จำนวนหน่วยที่ต้องการ</FormLabel>
                      <FormControl>
                        <Input
                          className={
                            testItemForm.getFieldState('testAmount').error &&
                            'ring-1 ring-error-500'
                          }
                          placeholder="ระบุจำนวนหน่วย (บังคับ)"
                          onChange={(e) => {
                            const cleanedValue = e.target.value.replace(
                              /\D/g,
                              ''
                            );
                            const parsedValue = cleanedValue
                              ? Number(cleanedValue)
                              : undefined;
                            field.onChange(parsedValue);
                          }}
                          value={field.value ? String(field.value) : ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={testItemForm.control}
                  name="testDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รายละเอียด</FormLabel>
                      <FormControl>
                        <Textarea
                          className={
                            testItemForm.getFieldState('testDetails').error &&
                            'ring-1 ring-error-500'
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
                      <FormLabel>รายละเอียด</FormLabel>
                      <FormControl>
                        <Textarea
                          className={
                            testItemForm.getFieldState('testNote').error &&
                            'ring-1 ring-error-500'
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
            )}
          </div>
          <DialogFooter>
            <Button variant="outline">ยกเลิก</Button>
            <Button variant="accept" type="submit">
              {isAdd ? 'เพิ่มรายการ' : 'บันทึกการเปลี่ยนแปลง'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
