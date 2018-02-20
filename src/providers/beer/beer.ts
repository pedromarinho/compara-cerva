import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class BeerProvider {

  constructor(private dataBaseProvider: DatabaseProvider) {

  }

}
