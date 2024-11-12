import { RequestReservationForm } from '@ce-lab-mgmt/api-interfaces';
import {
  OrgInfoFormReturned,
  TestListFormReturned,
} from '../../entity/request_reservation/reqReservRequestFormEntity';

export default function reqReservRequestMapper({
  orgForm,
  testListForm,
}: {
  orgForm: OrgInfoFormReturned;
  testListForm: TestListFormReturned;
}): RequestReservationForm {
  const ad = testListForm.getValues('testList');
  return {
    orgInfo: {
      orgName: orgForm.getValues('orgName'),
      orgProjectName:
        orgForm.getValues('orgProjectName').length > 0
          ? orgForm.getValues('orgProjectName')
          : undefined,
      orgAddress: orgForm.getValues('orgAddress'),
      orgEmail: orgForm.getValues('orgEmail'),
      orgPhone: orgForm.getValues('orgPhone'),
      orgFax:
        orgForm.getValues('orgFax').length > 0
          ? orgForm.getValues('orgFax')
          : undefined,
    },
    testInfo: {
      testType: testListForm.getValues('testType'),
      testList: testListForm.getValues('testList').map((test, idx) => ({
        testID: test.testID,
        testAmount: test.testAmount,
        testDetails: test.testDetails.length > 0 ? test.testDetails : null,
        testNote: test.testNote.length > 0 ? test.testNote : null,
        testTotalPrice: test.testTotalPrice,
        assignedProfessorName: null,
        markedAsDone: null,
        certificateUploadedAt: null,
        testItemID: idx.toString(),
        testName: test.testName,
        testPricePerUnit: test.testPricePerUnit,
        testUnit: test.testUnit,
      })),
    },
  };
}
