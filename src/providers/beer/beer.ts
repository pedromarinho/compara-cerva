import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Beer } from '../../models/beer';

@Injectable()
export class BeerProvider {

  constructor(private storage: Storage) { }

  list() {
    let beers: Beer[] = [];
    return this.storage.forEach((beer: Beer, key: string, iterationNumber: Number) => {
      beers.push(beer);
    })
      .then(() => {
        return Promise.resolve(beers.sort((a, b) => a.liter - b.liter));
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  save(beer: Beer) {
    beer.id = new Date().getTime().toString();
    return this.storage.set(beer.id, beer);
  }

  update(key: string, beer: Beer): Promise<Beer> {
    return this.storage.set(key, beer);
  }

  delete(key: string): Promise<Beer> {
    return this.storage.remove(key);
  }

}
