import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { AppService } from '../../app/app.service';

import { BeerPage } from '../beer/beer';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';

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
    private dataBaseProvider: DatabaseProvider) {
  }

  ionViewDidLoad() {
    this.getData();
  }

  getData() {
    this.dataBaseProvider.getDB()
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM beers ORDER BY liter ASC', {})
          .then((data: any) => {
            if (data.rows.length > 0) {
              let itens = []
              for (let i = 0; i < data.rows.length; i++) {
                itens.push(data.rows.item(i));
              }
              this.data = itens;
            } else {
              this.data = [];
              this.toastCtrl.create({
                message: 'Adicione uma cerveja para comparar',
                duration: 3000,
                position: 'middle'
              }).present();
            }

          })
          .catch((e) => console.error(e));

      })
      .catch(e => this.log(e));
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
            this.dataBaseProvider.getDB()
              .then((db: SQLiteObject) => {
                db.executeSql('DELETE FROM beers WHERE id = ?', [item.id])
                  .then(() => {
                    this.getData();
                    this.toastCtrl.create({
                      message: item.name + ' deletado',
                      duration: 3000
                    }).present();
                  })
                  .catch(e => this.log('Erro ao deletar'));
              }).catch(e => {
                console.log(e);
              });
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
