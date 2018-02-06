import { Component } from '@angular/core';

import { Platform, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { Beer } from '../../models/beer';

@Component({
    templateUrl: 'beer.html'
})
export class BeerPage {
    public beer = new Beer();

    constructor(public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public toastCtrl: ToastController,
        private app: AppService) {

        console.log(this.params.data.name);
        if (this.params.data) {
            this.beer = this.params.data;
        }

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    save() {
        if (this.valid()) {
            this.beer.liter = this.getPricePerLiter(this.beer);
            this.app.save(this.beer);
            this.dismiss();
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

    getIcon() {
        console.log('ml: ', this.beer.ml)
        switch (this.beer.ml) {
            case 269:
                return './assets/imgs/lata_269.png';
            case 300:
                return './assets/imgs/garrafa_300.png';
            case 350:
                return './assets/imgs/lata_350.png';
            case 355:
                return './assets/imgs/long_neck.png';
            case 473:
                return './assets/imgs/lata_473.png';
            case 550:
                return './assets/imgs/lata_550.png';
            case 600:
                return './assets/imgs/garrafa_600.png';
            case 1000:
                return './assets/imgs/garrafa_1000.png';
            default:
                return './assets/imgs/lata_269.png';

        }
    }
}


