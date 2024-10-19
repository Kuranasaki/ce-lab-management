export default class TestListTableItem {
    id: string;
    name: string;
    detail: string;
    note: string;
    price: number;
    amount: number;
    unit: number;
    priceperunit: number;

    constructor(
        id: string,
        name: string,
        detail: string,
        note: string,
        price: number,
        amount: number,
        unit: number,
        priceperunit: number
    ) {
        this.id = id;
        this.name = name;
        this.detail = detail;
        this.note = note;
        this.price = price;
        this.amount = amount;
        this.unit = unit;
        this.priceperunit = priceperunit;
    }

    formatPrice(): string {
        return new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
        }).format(this.price);
    }

}
