import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { Beer } from '../../models/beer';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class BeerProvider {
  SELECT_SQL = 'SELECT * FROM beers ORDER BY liter ASC';
  INSERT_SQL = 'INSERT INTO beers (name, price, quantity, ml, liter, local) VALUES(?,?,?,?,?,?)';
  UPDATE_SQL = 'UPDATE beers SET name=?, price=?, quantity=?, ml=?, liter=?, local=? WHERE id=?';
  DELETE_SQL = 'DELETE FROM beers WHERE id = ?';

  constructor(private dataBaseProvider: DatabaseProvider) {

  }

  list(): Promise<Beer[]> {
    return new Promise<Beer[]>((resolve, reject) => {
      this.dataBaseProvider.getDB()
        .then((db: SQLiteObject) => {
          db.executeSql(this.SELECT_SQL, {})
            .then((data: any) => {
              if (data.rows.length > 0) {
                let itens = []
                for (let i = 0; i < data.rows.length; i++) {
                  itens.push(data.rows.item(i));
                }
                resolve(itens);
              } else {
                resolve([]);
              }

            })
            .catch((e) => reject(e));
        })
        .catch(e => reject(e));
    });
  }

  save(beer: Beer): Promise<Beer> {
    return new Promise<Beer>((resolve, reject) => {
      this.dataBaseProvider.getDB()
        .then((db: SQLiteObject) => {
          db.executeSql(this.INSERT_SQL,
            [beer.name, beer.price, beer.quantity, beer.ml, beer.liter, ""])
            .then(res => resolve(res))
            .catch(e => reject(e));
        }).catch(e => reject(e));
    })
  }

  update(beer: Beer): Promise<Beer> {
    return new Promise<Beer>((resolve, reject) => {
      this.dataBaseProvider.getDB()
        .then((db: SQLiteObject) => {
          db.executeSql(this.UPDATE_SQL,
            [beer.name, beer.price, beer.quantity, beer.ml, beer.liter, "", beer.id])
            .then(res => resolve(res))
            .catch(e => reject(e));
        }).catch(e => reject(e));
    })
  }

  delete(beer: Beer): Promise<Beer> {
    return new Promise<Beer>((resolve, reject) => {
      this.dataBaseProvider.getDB()
        .then((db: SQLiteObject) => {
          db.executeSql(this.DELETE_SQL, [beer.id])
            .then(() => resolve(beer))
            .catch(e => reject(e));
        }).catch(e => reject(e));
    })

  }

}
