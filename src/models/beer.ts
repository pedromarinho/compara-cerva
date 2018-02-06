export class Beer {
    id: number;
    name: string;
    price: number;
    quantity: number;
    ml: number;
    liter: number;
    local: string;

    constructor(
        id: number = undefined,
        name: string = undefined,
        price: number = undefined,
        quantity: number = undefined,
        ml: number = undefined,
        liter: number = undefined,
        local: string = undefined
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.ml = ml;
        this.liter = liter;
        this.local = local;
    }
}