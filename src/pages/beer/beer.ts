import { Component, ViewChild, ElementRef } from '@angular/core';

import { Platform, NavParams, ViewController, ToastController, PopoverController } from 'ionic-angular';
import { Beer } from '../../models/beer';
import { SQLiteObject } from '@ionic-native/sqlite';
import { AppService } from '../../app/app.service';
import { DatabaseProvider } from '../../providers/database/database';


@Component({
    templateUrl: 'recipients.html'
})

export class RecipientPage {
    constructor(private params: NavParams, private viewCtrl: ViewController) { }

    setRecipient(ml) {
        console.log(ml);
        this.params.get('setRecipient')(ml);
        this.viewCtrl.dismiss();
    }
}

@Component({
    templateUrl: 'beer.html'
})
export class BeerPage {
    @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
    public beer = new Beer();
    public title = 'Adicionar';
    public recipient = '';
    public recipientImg = './assets/imgs/lata_269.png';

    constructor(public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public toastCtrl: ToastController,
        private popoverCtrl: PopoverController,
        public app: AppService,
        private dataBaseProvider: DatabaseProvider) {

        console.log(this.params.data.name);
        if (this.params.data.id) {
            this.beer = this.params.data;
            this.title = 'Editar';
            this.getIcon(this.beer.ml);
        }

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    insert() {
        this.dataBaseProvider.getDB()
            .then((db: SQLiteObject) => {
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
        this.dataBaseProvider.getDB()
            .then((db: SQLiteObject) => {
                db.executeSql('UPDATE beers SET name=?, price=?, quantity=?, ml=?, liter=?, local=? WHERE id=?',
                    [this.beer.name, this.beer.price, this.beer.quantity, this.beer.ml, this.beer.liter, "", this.beer.id])
                    .then(res => {
                        this.toastCtrl.create({
                            message: 'Cerva atualizada!',
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
        return this.beer.name && this.app.validNum(this.beer.price) && this.beer.price < 10000 && this.app.validNum(this.beer.quantity)
            && this.beer.quantity < 10000 && this.app.validNum(this.beer.ml) && this.beer.ml < 100000;
    }


    getIcon(selectedValue: any) {
        this.beer.ml = selectedValue;
        switch (Number(selectedValue)) {
            case 269:
                this.recipient = 'Latinha';
                this.recipientImg = './assets/imgs/lata_269.png';
                break;
            case 300:
                this.recipient = 'Garrafinha';
                this.recipientImg = './assets/imgs/garrafa_300.jpg';
                break;
            case 350:
                this.recipient = 'Lata';
                this.recipientImg = './assets/imgs/lata_350.png';
                break;
            case 355:
                this.recipient = 'Long neck';
                this.recipientImg = './assets/imgs/garrafa_355.jpg';
                break;
            case 473:
                this.recipient = 'Latão';
                this.recipientImg = './assets/imgs/lata_473.png';
                break;
            case 550:
                this.recipient = 'Super latão';
                this.recipientImg = './assets/imgs/lata_550.png';
                break;
            case 600:
                this.recipient = 'Garrafa';
                this.recipientImg = './assets/imgs/garrafa_600.jpg';
                break;
            case 1000:
                this.recipient = 'Litrão';
                this.recipientImg = './assets/imgs/garrafa_1000.jpg';
                break;
        }
    }

    presentPopover(ev) {
        let popover = this.popoverCtrl.create(RecipientPage, {
            contentEle: this.content.nativeElement,
            setRecipient: (value) => {
                this.getIcon(value);
            }
        });
        popover.present({
            ev: ev
        });
    }
}


