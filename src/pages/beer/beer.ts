import { Component } from '@angular/core';

import { Platform, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { Beer } from '../../models/beer';

@Component({
    templateUrl: 'beer.html'
})
export class BeerPage {
    public beer = new Beer();
    public recipiente;

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


