import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';
import { AppService } from '../../app/app.service';

@Component({
    templateUrl: 'beer.html'
})
export class BeerPage {
    public beer = {
        name: '',
        price: '',
        quantity: '',
        ml: '',
        liter: 0
    };

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
        this.app.save(this.beer);
        this.dismiss();
    }
}


