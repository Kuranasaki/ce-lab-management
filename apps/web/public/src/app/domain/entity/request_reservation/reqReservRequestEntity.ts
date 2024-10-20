export class RequestReservationEntity {
  orgData: OrgDataEntity;
  testList: TestListEntity;

  constructor({
    orgData,
    testList,
  }: {
    orgData: OrgDataEntity;
    testList: TestListEntity;
  }) {
    this.orgData = orgData;
    this.testList = testList;
  }
}

export class OrgDataEntity {
  orgName: string;
  orgProjectName: string;
  orgAddress: string;
  orgPhone: string;
  orgEmail: string;
  orgFax: string;

  constructor({
    orgName,
    orgProjectName,
    orgAddress,
    orgPhone,
    orgEmail,
    orgFax,
  }: {
    orgName: string;
    orgProjectName: string;
    orgAddress: string;
    orgPhone: string;
    orgEmail: string;
    orgFax: string;
  }) {
    this.orgName = orgName;
    this.orgProjectName = orgProjectName;
    this.orgAddress = orgAddress;
    this.orgPhone = orgPhone;
    this.orgEmail = orgEmail;
    this.orgFax = orgFax;
  }
}

export class TestListEntity {
  testType: string;
  testItems: TestItemEntity[];

  constructor({
    testType,
    testItems,
  }: {
    testType: string;
    testItems: TestItemEntity[];
  }) {
    this.testType = testType;
    this.testItems = testItems;
  }
}

export class TestItemEntity {
  testName: string;
  testSubName: string;
  testAmount: number;
  testDetails: string;
  testNote: string;

  constructor({
    testName,
    testSubName,
    testAmount,
    testDetails,
    testNote,
  }: {
    testName: string;
    testSubName: string;
    testAmount: number;
    testDetails: string;
    testNote: string;
  }) {
    this.testName = testName;
    this.testSubName = testSubName;
    this.testAmount = testAmount;
    this.testDetails = testDetails;
    this.testNote = testNote;
  }
}
