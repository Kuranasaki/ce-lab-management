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
import { TestListForm } from '../../../../hooks/request_reservation/useTestListForm';
import AddEditItemDialog from './AddEditItemDialog';
import { useState } from 'react';
import { useTestItemForm } from '../../../../hooks/request_reservation/useTestItemForm';
import test from 'node:test';

export default function Stage2({
  testListForm,
  setStage,
}: {
  testListForm: TestListForm;
  setStage: (stage: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const { testItemForm } = useTestItemForm();

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
    const testItem = testListForm.getValues('testList')[index];
    testItemForm.setValue('testName', testItem.testName);
    testItemForm.setValue('testSubName', testItem.testSubName);
    testItemForm.setValue('testAmount', testItem.testAmount);
    testItemForm.setValue('testDetails', testItem.testDetails);
    testItemForm.setValue('testNote', testItem.testNote);
    setOpen(true);
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

              <div>
                {testListForm.getValues('testList').map((testItem, index) => (
                  <div
                    className="flex flex-row justify-between gap-2"
                    key={index}
                  >
                    <div>{testItem.testName}</div>
                    <div>{testItem.testSubName}</div>
                    <div>{testItem.testAmount}</div>
                    <div>{testItem.testDetails}</div>
                    <div>{testItem.testNote}</div>
                    <div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditIndex(index);
                          handleOpenEditDialog(index);
                        }}
                      >
                        แก้ไข
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const updatedTestList = testListForm
                            .getValues('testList')
                            .filter((_, i) => i !== index);
                          testListForm.setValue('testList', updatedTestList, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                          testListForm.trigger('testList');
                        }}
                      >
                        ลบ
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Test Item Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <AddEditItemDialog
            isAdd={editIndex === -1}
            testItemForm={testItemForm}
            onSubmit={handleDialogSubmit}
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
              onClick={testListForm.handleSubmit(() => setStage(2))}
            >
              ต่อไป
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}
