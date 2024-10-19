import TestListTableItem from "./TestListTableItem";

export default class TestListTable {
    items: TestListTableItem[];
    totalPrice: number;

    constructor(items: TestListTableItem[], totalPrice: number) {
        this.items = items;
        this.totalPrice = totalPrice;
    }

    addItem(newItem: TestListTableItem): TestListTable {
        const updatedItems = [...this.items, newItem];
        const updatedTotalPrice = this.totalPrice + newItem.price; 
        
        return new TestListTable(updatedItems, updatedTotalPrice);
    }

    removeItem(itemId: string): TestListTable {
        const updatedItems = this.items.filter(item => item.id !== itemId);
        const removedItem = this.items.find(item => item.id === itemId);
        const updatedTotalPrice = removedItem ? this.totalPrice - removedItem.price : this.totalPrice; 

        return new TestListTable(updatedItems, updatedTotalPrice);
    }

    // NOT FULLY TEST
    editItem(itemId: string, updatedItem: Partial<TestListTableItem>): TestListTable {
        // Use map to create a new items array
        const updatedItems = this.items.map(item => {
            if (item.id === itemId) {
                // Create a new instance of TestListTableItem with the updated properties
                return new TestListTableItem(
                    item.id, // Keep the original ID
                    updatedItem.name ?? item.name, // Use updated name or keep original
                    updatedItem.detail ?? item.detail, // Use updated detail or keep original
                    updatedItem.note ?? item.note, // Use updated note or keep original
                    updatedItem.price ?? item.price, // Use updated price or keep original
                    updatedItem.amount ?? item.amount, // Use updated amount or keep original
                    updatedItem.unit ?? item.unit, // Use updated amount or keep original
                    updatedItem.priceperunit ?? item.priceperunit // Use updated price per unit or keep original
                );
            }
            return item; // Return original item if no update
        });
    
        // Update the totalPrice if the price has changed
        const updatedTotalPrice = updatedItems.reduce((total, item) => total + item.price, 0);
    
        // Create a new TestListTable with updated items and total price
        return new TestListTable(updatedItems, updatedTotalPrice);
    }

    formatTotalPrice(): string {
        return new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
        }).format(this.totalPrice);
    }
}
