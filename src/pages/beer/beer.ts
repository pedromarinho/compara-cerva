import { Component } from '@angular/core';

import { Platform, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Beer } from '../../models/beer';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
    templateUrl: 'beer.html'
})
export class BeerPage {
    public beer = new Beer();
    public title = 'Adicionar';
    public recipiente;

    constructor(public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public toastCtrl: ToastController,
        private sqlite: SQLite) {

        console.log(this.params.data.name);
        if (this.params.data.id) {
            this.beer = this.params.data;
            this.title = 'Editar';
        }

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    insert() {
        this.sqlite.create({
            name: 'comparacerva.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            db.executeSql('INSERT INTO beers (name, price, quantity, ml, liter, local) VALUES(?,?,?,?,?,?)',
                [this.beer.name, this.beer.price, this.beer.quantity, this.beer.ml, this.beer.liter, ""])
                .then(res => {
                    console.log(res);
                })
                .catch(e => {
                    console.log(e);
                });
        }).catch(e => {
            console.log(e);
        });

        this.dismiss();

    }

    update() {
        this.sqlite.create({
            name: 'comparacerva.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            db.executeSql('UPDATE beers SET name=?, price=?, quantity=?, ml=?, liter=?, local=? WHERE id=?',
                [this.beer.name, this.beer.price, this.beer.quantity, this.beer.ml, this.beer.liter, "", this.beer.id])
                .then(res => {
                    this.toastCtrl.create({
                        message: 'update success!',
                        duration: 3000
                    }).present();
                })
                .catch(e => {
                    this.toastCtrl.create({
                        message: 'update error!',
                        duration: 3000
                    }).present();
                    console.log(e);
                });
        }).catch(e => {
            console.log(e);
        });

        this.dismiss();

    }

    save() {
        if (this.valid()) {
            this.beer.liter = this.getPricePerLiter(this.beer);
            if (this.beer.id) {
                this.update();
            } else {
                this.insert();
            }
        } else {
            this.toastCtrl.create({
                message: 'Dados inválidos!',
                duration: 3000
            }).present();
        }
    }

    getPricePerLiter(beer: Beer): number {
        return Number(((beer.price * 1000) / (beer.ml * beer.quantity)).toFixed(2));
    }

    valid() {
        return this.beer.name && this.beer.price && this.beer.quantity && this.beer.ml;
    }

    getIcon(selectedValue: any) {
        this.beer.ml = selectedValue;
        switch (Number(selectedValue)) {
            case 269:
                this.recipiente = './assets/imgs/lata_269.png';
                break;
            case 300:
                this.recipiente = './assets/imgs/garrafa_300.jpg';
                break;
            case 350:
                this.recipiente = './assets/imgs/lata_350.png';
                break;
            case 355:
                this.recipiente = './assets/imgs/garrafa_355.jpg';
                break;
            case 473:
                this.recipiente = './assets/imgs/lata_473.png';
                break;
            case 550:
                this.recipiente = './assets/imgs/lata_550.png';
                break;
            case 600:
                this.recipiente = './assets/imgs/garrafa_600.jpg';
                break;
            case 1000:
                this.recipiente = './assets/imgs/garrafa_1000.jpg';
                break;
        }
    }
}


