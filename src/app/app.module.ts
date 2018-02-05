import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AppService } from './app.service';
import { AboutPage } from '../pages/about/about';
import { ContadorPage } from '../pages/contador/contador';
import { ComparaPage } from '../pages/compara/compara';
import { TabsPage } from '../pages/tabs/tabs';
import { BeerPage } from '../pages/beer/beer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContadorPage,
    ComparaPage,
    TabsPage,
    BeerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContadorPage,
    ComparaPage,
    TabsPage,
    BeerPage
  ],
  providers: [
    AppService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
