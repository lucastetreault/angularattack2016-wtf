import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Angularattack2016WtfAppComponent, environment } from './app/';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

if (environment.production) {
  enableProdMode();
}

bootstrap(Angularattack2016WtfAppComponent);
