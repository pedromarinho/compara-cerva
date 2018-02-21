import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { AppService } from '../../app/app.service';

import { BeerPage } from '../beer/beer';
import { BeerProvider } from '../../providers/beer/beer';

@Component({
  selector: 'compara',
  templateUrl: 'compara.html'
})
export class ComparaPage {

  public data = [];

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public app: AppService,
    public modalCtrl: ModalController,
    private beerProvider: BeerProvider) {
  }

  ionViewDidLoad() {
    this.getData();
  }

  getData() {
    this.beerProvider.list()
      .then(data => {
        this.data = data;
        if (data.length === 0) {
          this.toastCtrl.create({
            message: 'Adicione uma cerveja para comparar',
            duration: 3000,
            position: 'middle'
          }).present();
        }
      })
  }

  delete(item): void {
    let confirm = this.alertCtrl.create({
      title: 'Deletar?',
      message: 'Tem certeza que deseja deletar ' + item.name + '?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.beerProvider.delete(item)
              .then(() => {
                this.getData();
                this.toastCtrl.create({
                  message: item.name + ' deletado',
                  duration: 3000
                }).present();
              })
              .catch(err => {
                this.log('Erro ao deletar');
              })
          }
        }
      ]
    });
    confirm.present();
  }

  openBeerModal(beer) {
    let modal = this.modalCtrl.create(BeerPage, beer);
    modal.onDidDismiss(() => this.getData());
    modal.present();
  }

  log(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

}
