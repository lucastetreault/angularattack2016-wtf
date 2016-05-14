import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Angularattack2016WtfAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(Angularattack2016WtfAppComponent);
