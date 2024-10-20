import TestListTableItemProps from './TestListTableItemProps';

export default class TestListTableProps {
  items: TestListTableItemProps[];
  totalPrice: number;

  constructor(items: TestListTableItemProps[] = [], totalPrice = 0) {
    this.items = items;
    this.totalPrice = totalPrice;
  }

  formatTotalPrice(): string {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(this.totalPrice);
  }
}
