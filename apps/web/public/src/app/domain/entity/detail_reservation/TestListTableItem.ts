export default class TestListTableItem {
    id: string;
    name: string;
    price: number;
    amount: number;
    unit: string;
    priceperunit: number;
    detail: string;
    note: string;

    constructor(
        id: string,
        name: string,
        price: number,
        amount: number,
        unit: string,
        priceperunit: number,
        detail: string | null,
        note: string | null,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.unit = unit;
        this.priceperunit = priceperunit;
        this.detail = detail ? detail : "";
        this.note = note ? note : "";
    }

    formatPrice(): string {
        return new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
        }).format(this.price);
    }

}
