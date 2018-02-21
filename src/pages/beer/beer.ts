import { Component, ViewChild, ElementRef } from '@angular/core';

import { Platform, NavParams, ViewController, ToastController, PopoverController } from 'ionic-angular';
import { Beer } from '../../models/beer';
import { AppService } from '../../app/app.service';
import { BeerProvider } from '../../providers/beer/beer';


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
        private beerProvider: BeerProvider) {

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
        this.beerProvider.save(this.beer)
            .then(() => {
                console.log('salvo com sucesso');
            })
            .catch(err => {
                this.toastCtrl.create({
                    message: 'Erro ao salvar!',
                    duration: 3000
                }).present();
                console.log(err);
            })

        this.dismiss();
    }

    update() {
        this.beerProvider.update(this.beer)
            .then(() => {
                this.toastCtrl.create({
                    message: 'Cerva atualizada!',
                    duration: 3000
                }).present();
            })
            .catch(err => {
                this.toastCtrl.create({
                    message: 'Erro ao atualizar!',
                    duration: 3000
                }).present();
                console.log(err);
            })

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


