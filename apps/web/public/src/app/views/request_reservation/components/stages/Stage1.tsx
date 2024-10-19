import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Textarea,
} from '@ce-lab-mgmt/shared-ui';
import { Link } from 'react-router-dom';

export default function Stage1({
  orgForm,
  onSubmit,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orgForm: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (value: any) => void;
}) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <Form {...orgForm}>
        <div className="flex flex-col gap-5">
          <h4>ข้อมูลบริษัท/หน่วยงานขอทดสอบ</h4>
          <form
            onSubmit={orgForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={orgForm.control}
              name="orgName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>บริษัท/หน่วยงาน</FormLabel>
                  <FormControl>
                    <Input
                      className={
                        orgForm.getFieldState('orgName').error &&
                        'ring-1 ring-error-500'
                      }
                      placeholder="ระบุบริษัทหรือหน่วยงาน (บังคับ)"
                      {...field}
                    />
                  </FormControl>
                  {orgForm.getFieldState('orgName').error && (
                    <p className="text-error-500">
                      {orgForm.getFieldState('orgName').error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={orgForm.control}
              name="orgProjectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>โครงการ</FormLabel>
                  <FormControl>
                    <Input
                      className={
                        orgForm.getFieldState('orgProjectName').error &&
                        'ring-1 ring-error-500'
                      }
                      placeholder="ระบุชื่อโครงการ (ถ้ามี)"
                      {...field}
                    />
                  </FormControl>
                  {orgForm.getFieldState('orgProjectName').error && (
                    <p className="text-error-500">
                      {orgForm.getFieldState('orgProjectName').error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={orgForm.control}
              name="orgAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ที่อยู่</FormLabel>
                  <FormControl>
                    <Textarea
                      className={
                        orgForm.getFieldState('orgAddress').error &&
                        'ring-1 ring-error-500'
                      }
                      placeholder="ระบุที่อยู่ (บังคับ)"
                      {...field}
                    />
                  </FormControl>
                  {orgForm.getFieldState('orgAddress').error && (
                    <p className="text-error-500">
                      {orgForm.getFieldState('orgAddress').error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={orgForm.control}
              name="orgEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className={
                        orgForm.getFieldState('orgEmail').error &&
                        'ring-1 ring-error-500'
                      }
                      placeholder="ระบุอีเมล (บังคับ)"
                      {...field}
                    />
                  </FormControl>
                  {orgForm.getFieldState('orgEmail').error && (
                    <p className="text-error-500">
                      {orgForm.getFieldState('orgEmail').error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-8">
              <FormField
                control={orgForm.control}
                name="orgPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>โทรศัพท์</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          orgForm.getFieldState('orgPhone').error &&
                          'ring-1 ring-error-500'
                        }
                        placeholder="ระบุหมายเลขโทรศัพท์ (บังคับ)"
                        {...field}
                      />
                    </FormControl>
                    {orgForm.getFieldState('orgPhone').error && (
                      <p className="text-error-500">
                        {orgForm.getFieldState('orgPhone').error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={orgForm.control}
                name="orgFax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FAX</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          orgForm.getFieldState('orgFax').error &&
                          'ring-1 ring-error-500'
                        }
                        placeholder="ระบุหมายเลขโทรสาร (ถ้ามี)"
                        {...field}
                      />
                    </FormControl>
                    {orgForm.getFieldState('orgFax').error && (
                      <p className="text-error-500">
                        {orgForm.getFieldState('orgFax').error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-row justify-end w-full gap-2">
          <Link to="/reservation">
            <Button variant="outline">ยกเลิก</Button>
          </Link>
          <Button type="submit" onClick={orgForm.handleSubmit(onSubmit)}>
            ต่อไป
          </Button>
        </div>
      </Form>
    </div>
  );
}
