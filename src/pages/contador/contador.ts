import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, PopoverController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

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

  useAppetizer = false;

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
    private toast: Toast,
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
    this.total.forEach = ((this.total.price + (this.useAppetizer ? this.data.appetizer : 0)) * (1 + this.data.percent)) / this.data.peaple;
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
    if (!this.app.validNum(this.data.price) || this.data.price > 1000) {
      this.toast.show('Preço inválido!', '3000', 'center').subscribe();
      return false;
    } else if (!this.app.validNum(this.data.ml) || this.data.ml > 100000 || !Number.isInteger(Number(this.data.ml))) {
      this.toast.show('Valor em ml inválido!', '3000', 'center').subscribe();
      return false;
    } else if (!this.app.validNum(this.data.peaple) || this.data.peaple > 50 || !Number.isInteger(Number(this.data.peaple))) {
      this.toast.show('O número de pessoas é inválido!', '3000', 'center').subscribe();
      return false;
    } else {
      return true;
    }
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

  addAppetizer(e) {
    if (e.checked) {
      this.useAppetizer = true;
    } else {
      this.useAppetizer = false;
    }
    if ((this.total.price || this.data.appetizer) && this.valid()) {
      this.updatePrice();
    }
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
          placeholder: 'valor',
          type: 'number',
          value: this.data.appetizer.toString()
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
            if (this.app.validNum(data.value) && data.value < 50000) {
              this.data.appetizer = Number(data.value);
              if (this.valid()) this.total.forEach = ((this.total.price + this.data.appetizer) * (1 + this.data.percent)) / this.data.peaple;
              this.storage.set('calculator_data', JSON.stringify(this.data));
            } else {
              this.toast.show('Valor inválido!', '3000', 'center').subscribe();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  changeInput(ev) {
    if (this.data.price && this.data.ml && this.data.peaple && this.valid()) this.updateTotal();
  }
}
