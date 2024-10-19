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
} from '@ce-lab-mgmt/shared-ui';
import { useTestItemForm } from '../../../../hooks/request_reservation/useTestItemForm';

export default function TestItemDialog({
  isAdd,
  currentData,
}: {
  isAdd: boolean;
  currentData?: {
    testName: string;
    testSubName: string;
    testAmount: number;
    testDetails: string;
    testNote: string;
  };
}) {
  const { testItemForm } = useTestItemForm(currentData);

  return (
    <DialogContent>
      <Form {...testItemForm}>
        <form>
          <DialogHeader>
            <p className="font-bold">
              {isAdd ? 'เพิ่มรายการทดสอบ' : 'แก้ไขรายการทดสอบ'}
            </p>
            <p>ระบุรายการทดสอบที่ต้องการ</p>
          </DialogHeader>
          <FormField
            control={testItemForm.control}
            name="testName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
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
          {testItemForm.getFieldState('testName').isDirty && (
            <FormField
              control={testItemForm.control}
              name="testSubName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกรายการทดสอบย่อย" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* To be replace with actual data */}
                        <SelectItem value="test1">Test 3.1</SelectItem>
                        <SelectItem value="test2">Test 3.2</SelectItem>
                        <SelectItem value="test3">Test 3.3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {testItemForm.getFieldState('testSubName').isDirty && (
            <FormField
              control={testItemForm.control}
              name="testAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>จำนวนหน่วยที่ต้องการ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ระบุจำนวนหน่วย (บังคับ)"
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '');
                        field.onChange(e);
                      }}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
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
