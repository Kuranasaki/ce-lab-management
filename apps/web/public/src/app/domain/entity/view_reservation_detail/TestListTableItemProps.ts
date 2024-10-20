export default class TestListTableItemProps {
  id: string;
  name: string;
  priceperunit: number;
  amount: number;
  unit: string;
  detail: string;
  note: string;

  constructor(
    id: string,
    name: string,
    priceperunit: number,
    amount: number,
    unit: string,
    detail: string | null,
    note: string | null
  ) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.unit = unit;
    this.priceperunit = priceperunit;
    this.detail = detail ? detail : '';
    this.note = note ? note : '';
  }

  formatPricePerUnit(): string {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(this.priceperunit);
  }
}
