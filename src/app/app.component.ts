import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    admobFree: AdMobFree) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // statusBar.overlaysWebView(true);
      statusBar.backgroundColorByHexString('#c48200');
      splashScreen.hide();

      const bannerConfig: AdMobFreeBannerConfig = {
        id: 'ca-app-pub-6028163069793986/9360989477',
        isTesting: false,
        autoShow: true,
        bannerAtTop: false
      };
      admobFree.banner.config(bannerConfig);

      admobFree.banner.prepare()
        .then()
        .catch(e => console.log(e));
    });
  }
}
