export default class ReservationTableItem {
    id: string;
    date: Date;
    type: "one" | "two" | "three";
    status: "pending" | "processing" | "success" | "canceled";
    amount: number;

    constructor(id: string, date: Date, type: "one" | "two" | "three", status: string, amount: number) {
        this.id = id;
        this.date = date;
        this.type = type;
        this.status = status as "pending" | "processing" | "success" | "canceled";
        this.amount = amount;
    }

    formatDate(): string {
        return this.date.toLocaleDateString("th-TH", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    formatAmount(): string {
        return new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
        }).format(this.amount);
    }
}