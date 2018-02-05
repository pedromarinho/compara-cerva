export class Beer {
    name: string;
    price: number;
    quantity: number;
    ml: number;
    liter: number;

    constructor(name: string = undefined,
        price: number = undefined,
        quantity: number = undefined,
        ml: number = undefined,
    ) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.ml = ml;
        this.liter = (ml * quantity * price) / 1000;
    }
}