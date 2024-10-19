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

export default function Stage2({
  testListForm,
  onSubmit,
  setStage,
}: {
  testListForm: any;
  onSubmit: any;
  setStage: (stage: number) => void;
}) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-7 w-full">
        <Form {...testListForm}>
          <div className="flex flex-col gap-4 w-full">
            <h4>ประเภทการทดสอบ</h4>
            <FormField
              control={testListForm.control}
              name="testType"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
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
                      <SelectItem value="วัสดุ">การทดสอบวัสดุ</SelectItem>
                      <SelectItem value="เทียบ">การทดสอบเทียบ</SelectItem>
                      <SelectItem value="ทนไฟ">การทดสอบทนไฟ</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </Form>
      </div>
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-row justify-end w-full gap-2">
          <Button variant="outline" onClick={() => setStage(1)}>
            ย้อนกลับ
          </Button>
          <Button type="submit" onClick={testListForm.handleSubmit(onSubmit)}>
            ต่อไป
          </Button>
        </div>
      </div>
    </div>
  );
}
