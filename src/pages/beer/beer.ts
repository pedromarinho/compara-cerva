import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';
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
        this.beer.liter = this.getPricePerLiter(this.beer);
        this.app.save(this.beer);
        this.dismiss();
    }

    getPricePerLiter(beer: Beer): number {
        return Number(((beer.price * 1000) / (beer.ml * beer.quantity)).toFixed(2));
    }
}


