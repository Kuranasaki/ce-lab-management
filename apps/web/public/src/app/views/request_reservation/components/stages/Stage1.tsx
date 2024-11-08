import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@ce-lab-mgmt/shared-ui';
import { Link } from 'react-router-dom';
import { OrgInfoFormReturned } from '../../../../domain/entity/request_reservation/reqReservRequestFormEntity';

export default function Stage1({
  orgForm,
  setStage,
}: {
  orgForm: OrgInfoFormReturned;
  setStage: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <Form {...orgForm}>
        <form
          onSubmit={orgForm.handleSubmit(() => setStage(2))}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-5">
            <h4>ข้อมูลบริษัท/หน่วยงานขอทดสอบ</h4>

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
                  <FormMessage />
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
                        orgForm.getFieldState('orgProjectName')?.error &&
                        'ring-1 ring-error-500'
                      }
                      placeholder="ระบุชื่อโครงการ (ถ้ามี)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(/\D/g, '');
                          field.onChange(e);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={orgForm.control}
                name="orgFax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>หมายเลขโทรสาร (FAX)</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          orgForm.getFieldState('orgFax').error &&
                          'ring-1 ring-error-500'
                        }
                        placeholder="ระบุหมายเลขโทรสาร (ถ้ามี)"
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(/\D/g, '');
                          field.onChange(e);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end w-full gap-2">
            <Link to="/reservation">
              <Button variant="outline">ยกเลิก</Button>
            </Link>
            <Button type="submit">ต่อไป</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
