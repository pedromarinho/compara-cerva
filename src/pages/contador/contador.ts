import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController, PopoverController, NavParams, ViewController } from 'ionic-angular';
import { AppService } from '../../app/app.service';

@Component({
  template: `
    <ion-item>
      <p (click)="click()" style="width:40%">Reiniciar</p>
    </ion-item>
    `
})

export class PopoverPage {
  constructor(private params: NavParams, private viewCtrl: ViewController) { }

  click() {
    this.params.get('clear')();
    this.viewCtrl.dismiss();
  }
}


@Component({
  selector: 'contador',
  templateUrl: 'contador.html'
})
export class ContadorPage {
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  public beers = 0;
  public percent = 0;

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

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public app: AppService,
    private popoverCtrl: PopoverController) { }

  public add() {
    if (this.valid()) {
      if (this.beers < 999) {
        this.beers++;
        this.updateTotal();
      }
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
    this.total.price = this.beers * this.data.price * (1 + this.percent);
    this.total.forEach = this.total.price / this.data.peaple;
    this.total.ml = Number((this.beers * this.data.ml).toFixed(1));
    this.total.mlForEach = Number((this.total.ml / this.data.peaple).toFixed(1));
  }

  private valid() {
    return this.app.validNum(this.data.price) && this.data.price < 1000 && this.app.validNum(this.data.ml)
      && this.data.ml < 100000 && this.app.validNum(this.data.peaple) && this.data.peaple < 50;
  }

  percentage(e) {
    if (e.checked) {
      this.percent = 0.1;
    } else {
      this.percent = 0;
    }
    if (this.total.price) {
      this.updateTotal();
    }
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.nativeElement,
      clear: () => {
        this.beers = this.total.price = this.total.forEach = this.total.ml = this.total.mlForEach = 0;
      }
    });
    popover.present({
      ev: ev
    });
  }
}
