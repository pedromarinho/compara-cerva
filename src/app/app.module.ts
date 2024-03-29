import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { enableProdMode } from '@angular/core';
import { MyApp } from './app.component';

import { AppService } from './app.service';
import { AboutPage } from '../pages/about/about';
import { ContadorPage } from '../pages/contador/contador';
import { ComparaPage } from '../pages/compara/compara';
import { TabsPage } from '../pages/tabs/tabs';
import { BeerPage } from '../pages/beer/beer';
import { PopoverPage } from '../pages/contador/contador';
import { RecipientPage } from '../pages/beer/beer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { AdMobFree } from '@ionic-native/admob-free';
import { BeerProvider } from '../providers/beer/beer';
import { Toast } from '@ionic-native/toast';

enableProdMode();

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContadorPage,
    ComparaPage,
    TabsPage,
    BeerPage,
    PopoverPage,
    RecipientPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContadorPage,
    ComparaPage,
    TabsPage,
    BeerPage,
    PopoverPage,
    RecipientPage
  ],
  providers: [
    AppService,
    StatusBar,
    SplashScreen,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BeerProvider,
    AdMobFree,
    Toast
  ]
})
export class AppModule { }
