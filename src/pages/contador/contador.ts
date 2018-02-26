import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController, PopoverController, NavParams, ViewController, AlertController } from 'ionic-angular';
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
    peaple: null,
    appetizer: 0
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
    private storage: Storage,
    public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    this.storage.get('calculator_data').then((val) => {
      this.data = JSON.parse(val) || {
        beers: 0,
        percent: 0,
        price: null,
        ml: null,
        peaple: null,
        appetizer: 0
      };
      if (this.data.price && this.data.ml && this.data.peaple) this.updateTotal();
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

  private updatePrice() {
    this.total.price = this.data.beers * this.data.price;
    this.total.forEach = ((this.total.price + this.data.appetizer) * (1 + this.data.percent)) / this.data.peaple;
  }

  private updateMl() {
    this.total.ml = Number((this.data.beers * this.data.ml).toFixed(1));
    this.total.mlForEach = Number((this.total.ml / this.data.peaple).toFixed(1));
  }

  private updateTotal() {
    if (this.valid()) {
      this.updatePrice();
      this.updateMl();
    }
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
    if ((this.total.price || this.data.appetizer) && this.valid()) {
      this.updatePrice();
    }
    this.storage.set('calculator_data', JSON.stringify(this.data));
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.nativeElement,
      clear: () => {
        this.data.beers = this.data.appetizer = this.total.price = this.total.forEach = this.total.ml = this.total.mlForEach = 0;
        this.storage.set('calculator_data', JSON.stringify(this.data));
      }
    });
    popover.present({
      ev: ev
    });
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Tira gosto',
      message: "Digite o valor do tira gosto",
      inputs: [
        {
          name: 'value',
          type: 'number',
          placeholder: 'valor'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log(data);
            if (data.value) {
              this.data.appetizer = Number(data.value);
              if (this.valid()) this.total.forEach = ((this.total.price + this.data.appetizer) * (1 + this.data.percent)) / this.data.peaple;
              this.storage.set('calculator_data', JSON.stringify(this.data));
              console.log(this.data)
              console.log(this.total)
            }
          }
        }
      ]
    });
    prompt.present();
  }

  changeInput() {
    if (this.valid()) this.updateTotal();
  }
}
