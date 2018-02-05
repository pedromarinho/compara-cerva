import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';

@Component({
  selector: 'compara',
  templateUrl: 'compara.html'
})
export class ComparaPage implements OnInit {

  private data: any;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
  }

  ngOnInit(): void {
    this.data = [
      {
        name: 'Skol latão',
        price: 2.99,
        quantity: 1,
        liter: 6.29
      },
      {
        name: 'Itaipava cx',
        price: 22.50,
        quantity: 12,
        liter: 4.78
      },
      {
        name: 'Antartica',
        price: 2.59,
        quantity: 1,
        liter: 5.00
      }
    ]
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

}
