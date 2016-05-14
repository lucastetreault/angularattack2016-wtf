import { Component } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Routes, Router} from '@angular/router';
import {PullRequestListComponent} from './pull-request-list/pull-request-list.component';
import {CodeCompareComponent} from './code-compare/code-compare.component';

@Component({
  moduleId: module.id,
  selector: 'angularattack2016-wtf-app',
  templateUrl: 'angularattack2016-wtf.component.html',
  styleUrls: ['angularattack2016-wtf.component.css'],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS],
  directives: [ROUTER_DIRECTIVES, PullRequestListComponent]
})
@Routes([
  {path: '/', component: PullRequestListComponent},
  {path: '/review/:pull', component: CodeCompareComponent}
])
export class Angularattack2016WtfAppComponent {
  title = "WTF's per minute!";

  constructor(private router: Router){
    this.router.navigate(['/']);
  }
}
