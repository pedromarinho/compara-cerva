import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController, PopoverController, NavParams, ViewController } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { Storage } from '@ionic/storage';

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

  public data = {
    beers: 0,
    percent: 0,
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
    private popoverCtrl: PopoverController,
    private storage: Storage) { }

  ionViewDidLoad() {
    this.storage.get('calculator_data').then((val) => {
      this.data = JSON.parse(val) || {
        beers: 0,
        percent: 0,
        price: null,
        ml: null,
        peaple: null
      };
      this.updateTotal();
    });
    
  }

  public add() {
    if (this.valid()) {
      if (this.data.beers < 999) {
        this.data.beers++;
        this.storage.set('calculator_data', JSON.stringify(this.data));
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
    if (this.data.beers > 0 && this.valid()) {
      this.data.beers--;
      this.storage.set('calculator_data', JSON.stringify(this.data));
      this.updateTotal();
    }
  }

  private updateTotal() {
    this.total.price = this.data.beers * this.data.price * (1 + this.data.percent);
    this.total.forEach = this.total.price / this.data.peaple;
    this.total.ml = Number((this.data.beers * this.data.ml).toFixed(1));
    this.total.mlForEach = Number((this.total.ml / this.data.peaple).toFixed(1));
  }

  private valid() {
    return this.app.validNum(this.data.price) && this.data.price < 1000 && this.app.validNum(this.data.ml)
      && this.data.ml < 100000 && this.app.validNum(this.data.peaple) && this.data.peaple < 50;
  }

  percentage(e) {
    if (e.checked) {
      this.data.percent = 0.1;
    } else {
      this.data.percent = 0;
    }
    if (this.total.price) {
      this.updateTotal();
    }
    this.storage.set('calculator_data', JSON.stringify(this.data));
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.nativeElement,
      clear: () => {
        this.data.beers = this.total.price = this.total.forEach = this.total.ml = this.total.mlForEach = 0;
        this.storage.set('calculator_data', JSON.stringify(this.data));
      }
    });
    popover.present({
      ev: ev
    });
  }
}
