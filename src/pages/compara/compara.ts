import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { AppService } from '../../app/app.service';

import { BeerPage } from '../beer/beer';
import { BeerProvider } from '../../providers/beer/beer';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'compara',
  templateUrl: 'compara.html'
})
export class ComparaPage {

  public data = [];

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private toast: Toast,
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
          this.showToast('Adicione uma cerveja para comparar');
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
            this.beerProvider.delete(item.id)
              .then(() => {
                this.getData();
                this.showToast(item.name + ' deletado');
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

  showToast(message) {
    this.toast.show(message, '3000', 'center').subscribe();
  }

  log(message) {
    this.toast.show(message, '5000', 'center');
  }

}
