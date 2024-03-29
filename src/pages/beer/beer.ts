import { Component, ViewChild, ElementRef } from '@angular/core';

import { Platform, NavParams, ViewController, PopoverController } from 'ionic-angular';
import { Beer } from '../../models/beer';
import { AppService } from '../../app/app.service';
import { BeerProvider } from '../../providers/beer/beer';
import { Toast } from '@ionic-native/toast';


@Component({
    templateUrl: 'recipients.html'
})

export class RecipientPage {
    constructor(private params: NavParams, private viewCtrl: ViewController) { }

    setRecipient(ml) {
        this.params.get('setRecipient')(ml);
        this.viewCtrl.dismiss();
    }
}

@Component({
    templateUrl: 'beer.html'
})
export class BeerPage {
    @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
    public beer = new Beer();
    public title = 'Adicionar';
    public recipient = '';
    public recipientImg = './assets/imgs/lata_269.png';

    constructor(public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        private toast: Toast,
        private popoverCtrl: PopoverController,
        public app: AppService,
        private beerProvider: BeerProvider) {

        if (this.params.data.id) {
            this.beer = this.params.data;
            this.title = 'Editar';
            this.getIcon(this.beer.ml);
        }

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    insert() {
        this.beerProvider.save(this.beer)
            .then(() => {
                console.log('salvo com sucesso');
            })
            .catch(err => {
                this.showToast('Erro ao salvar!');
                console.log(err);
            })

        this.dismiss();
    }

    update() {
        this.beerProvider.update(this.beer.id, this.beer)
            .then(() => {
                this.showToast('Cerva atualizada!');
            })
            .catch(err => {
                this.showToast('Erro ao atualizar!');
                console.log(err);
            })

        this.dismiss();
    }

    save() {
        if (this.valid()) {
            this.beer.liter = this.getPricePerLiter(this.beer);
            if (this.beer.id) {
                this.update();
            } else {
                this.insert();
            }
        }
    }

    getPricePerLiter(beer: Beer): number {
        return Number(((beer.price * 1000) / (beer.ml * beer.quantity)).toFixed(2));
    }

    private valid() {
        if (!this.beer.name) {
            this.toast.show('Digite um nome válido!', '3000', 'center').subscribe();
            return false;
        } else if (!this.app.validNum(this.beer.price) || this.beer.price > 10000) {
            this.toast.show('Digite um preço válido!', '3000', 'center').subscribe();
            return false;
        } else if (!this.app.validNum(this.beer.quantity) || this.beer.quantity > 10000 || !Number.isInteger(Number(this.beer.quantity))) {
            this.toast.show('Quantidade digitada é inválida!', '3000', 'center').subscribe();
            return false;
        } else if (!this.app.validNum(this.beer.ml) || this.beer.ml > 100000 || !Number.isInteger(Number(this.beer.ml))) {
            this.toast.show('Valor em ml inválido!', '3000', 'center').subscribe();
            return false;
        } else {
            return true;
        }
    }


    getIcon(selectedValue: any) {
        this.beer.ml = selectedValue;
        switch (Number(selectedValue)) {
            case 269:
                this.recipient = 'Latinha';
                this.recipientImg = './assets/imgs/lata_269.png';
                break;
            case 300:
                this.recipient = 'Garrafinha';
                this.recipientImg = './assets/imgs/garrafa_300.jpg';
                break;
            case 350:
                this.recipient = 'Lata';
                this.recipientImg = './assets/imgs/lata_350.png';
                break;
            case 355:
                this.recipient = 'Long neck';
                this.recipientImg = './assets/imgs/garrafa_355.jpg';
                break;
            case 473:
                this.recipient = 'Latão';
                this.recipientImg = './assets/imgs/lata_473.png';
                break;
            case 550:
                this.recipient = 'Super latão';
                this.recipientImg = './assets/imgs/lata_550.png';
                break;
            case 600:
                this.recipient = 'Garrafa';
                this.recipientImg = './assets/imgs/garrafa_600.jpg';
                break;
            case 1000:
                this.recipient = 'Litrão';
                this.recipientImg = './assets/imgs/garrafa_1000.jpg';
                break;
        }
    }

    presentPopover(ev) {
        let popover = this.popoverCtrl.create(RecipientPage, {
            contentEle: this.content.nativeElement,
            setRecipient: (value) => {
                this.getIcon(value);
            }
        });
        popover.present({
            ev: ev
        });
    }

    showToast(message) {
        this.toast.show(message, '3000', 'center').subscribe();
    }
}


