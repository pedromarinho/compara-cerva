export class AppService {
    public beers = [];

    list() {
        return this.beers;
    }

    save(beer) {
        for (let i = 0; i < this.beers.length; i++) {
            if (this.beers[i].id === beer.id) {
                this.beers[i] = beer;
                console.log('edit ', beer)
                return;
            }
        }
        beer.id = this.beers.length;
        console.log('save ', beer);
        this.beers.push(beer);
    }

    delete(index) {
        this.beers.splice(index, 1);
    }
}