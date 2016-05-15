import {Component, OnInit } from '@angular/core';
import {PullsService} from '../pulls.service';
import {PullRequestComponent} from '../pull-request/pull-request.component';
import {RouteSegment} from '@angular/router';
import {GithubService} from '../github.service';


@Component({
  moduleId: module.id,
  selector: 'app-pull-request-list',
  templateUrl: 'pull-request-list.component.html',
  styleUrls: ['pull-request-list.component.css'],
  providers: [GithubService],
  directives: [PullRequestComponent]
})
export class PullRequestListComponent implements OnInit {

  private pulls;
  private repos;

  constructor(private pullService: PullsService, private curr: RouteSegment, private github: GithubService) { }

  ngOnInit() {
    this.pulls = this.pullService.getPullRequests();
    this.github.setCode(this.curr.getParam('code'));
    this.repos = this.github.getRepos();
    this.repos.subscribe(repos => console.log(repos));
  }

  login() {
    window.location.href = <any>'https://github.com/login/oauth/authorize?client_id=9b4410e16f2ebd31a513&scope=public_repo,repo';
  }

}
