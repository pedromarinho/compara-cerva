import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AppService } from '../../app/app.service';

@Component({
  selector: 'contador',
  templateUrl: 'contador.html'
})
export class ContadorPage {
  public beers = 0;

  public data = {
    price: null,
    ml: null,
    peaple: null
  }

  public total = {
    price: 0,
    forEach: 0,
    ml: 0,
    mlForEach: 0
  }

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public app: AppService) { }

  public add() {
    if (this.valid()) {
      this.beers++;
      this.updateTotal();
    } else {
      this.toastCtrl.create({
        message: 'Dados inválidos!',
        duration: 3000
      }).present();
    }
  }

  public remove() {
    if (this.beers > 0 && this.valid()) {
      this.beers--;
      this.updateTotal();
    }
  }

  private updateTotal() {
    this.total.price = Number((this.beers * this.data.price).toFixed(2));
    this.total.forEach = Number((this.total.price / this.data.peaple).toFixed(2));
    this.total.ml = Number((this.beers * this.data.ml).toFixed(1));
    this.total.mlForEach = Number((this.total.ml / this.data.peaple).toFixed(1));
  }

  private valid() {
    return this.data.price && this.data.price > 0 && this.data.ml && this.data.ml > 0
      && this.data.peaple && this.data.peaple > 0;
  }

}
