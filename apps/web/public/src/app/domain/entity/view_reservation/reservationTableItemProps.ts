import { ReservationStatus, TestInfo } from '@ce-lab-mgmt/api-interfaces';

export default class ReservationTableItemProps {
  id: string;
  date: Date;
  type: string;
  status: ReservationStatus;
  amount: number;
  testInfo: TestInfo;

  constructor(
    id: string,
    date: Date,
    type: string,
    status: ReservationStatus,
    amount: number,
    testInfo: TestInfo
  ) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.status = status;
    this.amount = amount;
    this.testInfo = testInfo;
  }

  formatDate(): string {
    return this.date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  formatAmount(): string {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(
      this.testInfo.testList.reduce(
        (acc, testItem) =>
          acc +
          (testItem.testUnit === 'นาที'
            ? testItem.testPricePerUnit
            : testItem.testPricePerUnit * testItem.testAmount),
        0
      )
    );
  }
}
