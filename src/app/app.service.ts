export class AppService {
    public beers = [
        {
            name: 'Skol latão',
            price: 2.99,
            quantity: 1,
            liter: 6.29
        },
        {
            name: 'Itaipava cx',
            price: 22.50,
            quantity: 12,
            liter: 4.78
        },
        {
            name: 'Antartica',
            price: 2.59,
            quantity: 1,
            liter: 5.00
        }
    ];

    list() {
        return this.beers;
    }

    save(beer) {
        this.beers.push(beer);
    }

    delete(index) {
        this.beers.splice(index, 1);
    }
}