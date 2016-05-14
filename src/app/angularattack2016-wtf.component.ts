import { Component } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {PullRequestListComponent} from './pull-request-list/pull-request-list.component';

@Component({
  moduleId: module.id,
  selector: 'angularattack2016-wtf-app',
  templateUrl: 'angularattack2016-wtf.component.html',
  styleUrls: ['angularattack2016-wtf.component.css'],
  providers: [HTTP_PROVIDERS], 
  directives: [PullRequestListComponent]
})
export class Angularattack2016WtfAppComponent {
  title = 'angularattack2016-wtf works!';
}
