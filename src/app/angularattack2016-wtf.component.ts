import { Component, ViewEncapsulation } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Routes, Router} from '@angular/router';
import {PullRequestListComponent} from './pull-request-list/pull-request-list.component';
import {CodeCompareComponent} from './code-compare/code-compare.component';
import {DiffService} from './diff-service.service';
import {PullsService} from './pulls.service';
import {GithubService} from './github.service';

@Component({
  moduleId: module.id,
  selector: 'angularattack2016-wtf-app',
  templateUrl: 'angularattack2016-wtf.component.html',
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, DiffService, PullsService, GithubService],
  directives: [ROUTER_DIRECTIVES, PullRequestListComponent],
  encapsulation: ViewEncapsulation.None
})
@Routes([
  { path: '/', component: PullRequestListComponent },
  { path: '/review/:pullRequestId', component: CodeCompareComponent }
])
export class Angularattack2016WtfAppComponent {
  title = "WTF's per minute!";

  constructor(private router: Router) {
  }
}
