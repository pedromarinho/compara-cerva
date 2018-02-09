import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';

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
    IonicModule.forRoot(MyApp)
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
    SQLite,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DatabaseProvider
  ]
})
export class AppModule { }
