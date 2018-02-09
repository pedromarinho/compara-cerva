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
    this.total.price = this.beers * this.data.price;
    this.total.forEach = this.total.price / this.data.peaple;
    this.total.ml = Number((this.beers * this.data.ml).toFixed(1));
    this.total.mlForEach = Number((this.total.ml / this.data.peaple).toFixed(1));
  }

  private valid() {
    return this.data.price && this.data.price > 0 && this.data.ml && this.data.ml > 0
      && this.data.peaple && this.data.peaple > 0;
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.nativeElement,
      clear: () => {
        console.log('clear');
        this.beers = this.total.price = this.total.forEach = this.total.ml = this.total.mlForEach = 0;
      }
    });
    popover.present({
      ev: ev
    });
  }
}
