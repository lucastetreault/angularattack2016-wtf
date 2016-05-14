import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Angularattack2016WtfAppComponent } from '../app/angularattack2016-wtf.component';

beforeEachProviders(() => [Angularattack2016WtfAppComponent]);

describe('App: Angularattack2016Wtf', () => {
  it('should create the app',
      inject([Angularattack2016WtfAppComponent], (app: Angularattack2016WtfAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angularattack2016-wtf works!\'',
      inject([Angularattack2016WtfAppComponent], (app: Angularattack2016WtfAppComponent) => {
    expect(app.title).toEqual('angularattack2016-wtf works!');
  }));
});
