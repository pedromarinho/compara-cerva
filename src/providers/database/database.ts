import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'comparacerva.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        db.sqlBatch([
          ['CREATE TABLE IF NOT EXISTS beers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price INTEGER, quantity INTEGER,'
            + 'ml INTEGER, liter INTEGER, local TEXT)']
        ])
          .then(() => console.log('Tabela criada'))
          .catch(e => console.log('Erro ao criar a tabela'));

      })
      .catch(e => console.log(e));
  }

}