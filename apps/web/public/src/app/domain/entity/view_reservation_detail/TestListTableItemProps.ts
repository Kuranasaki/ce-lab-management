export default class TestListTableItemProps {
  id: string;
  name: string;
  amount: number;
  unit: string;
  detail: string;
  note: string;
  totalPrice: number;

  constructor(
    id: string,
    name: string,
    amount: number,
    unit: string,
    detail: string | null,
    note: string | null,
    totalPrice: number
  ) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.unit = unit;
    this.detail = detail ? detail : '';
    this.note = note ? note : '';
    this.totalPrice = totalPrice;
  }

  formatAmount(): string {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(this.totalPrice);
  }
}
