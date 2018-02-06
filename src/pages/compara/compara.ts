import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { AppService } from '../../app/app.service';

import { BeerPage } from '../beer/beer';

@Component({
  selector: 'compara',
  templateUrl: 'compara.html'
})
export class ComparaPage implements OnInit {

  private data: any;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private app: AppService,
    public modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.data = this.app.list();
  }

  getData() {
    return this.data.sort((a, b) => {
      if (a.liter > b.liter) {
        return 1;
      }
      if (a.liter < b.liter) {
        return -1;
      }
      return 0;
    })
  }

  delete(item, index): void {
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
            this.app.delete(index);
            let toast = this.toastCtrl.create({
              message: item.name + ' deletado',
              duration: 3000
            });
            toast.present();
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  openBeerModal(beer) {
    let modal = this.modalCtrl.create(BeerPage, beer);
    modal.present();
  }

}
