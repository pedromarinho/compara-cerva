import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContadorPage } from '../contador/contador';
import { ComparaPage } from '../compara/compara';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ContadorPage;
  tab2Root = ComparaPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
