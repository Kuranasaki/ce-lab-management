// Type of raw data from API
export type Reservation = {
    id: string;
    date: Date;
    type: "one" | "two" | "three";
    status: "pending" | "processing" | "success" | "canceled";
    amount: number;
};
