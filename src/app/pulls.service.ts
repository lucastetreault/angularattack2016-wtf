import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {DiffService} from './diff-service.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import {GithubService} from './github.service';


@Injectable()
export class PullsService {
  private pullRequests;
  pulls = {};
  private repo;

  constructor(private http: Http, private diffService: DiffService, private github: GithubService) {
    this.pullRequests = this.http.get('https://api.github.com/repos/angular/angular/pulls')
      .map(res => res.json());

    this.pullRequests.subscribe(pullRequests => {
      pullRequests.forEach(pullRequest => {
        this.pulls[pullRequest.number] = pullRequest;
      });
    });
  }

  getPullRequests(repo) {
    this.repo = repo;

    return this.http.get('https://api.github.com/repos/' + this.repo + '/pulls?access_token=' + this.github.accessToken)
      .map(res => res.json());
  }

  getPullRequestDetails(pullRequestNumber) {
    return this.http.get('https://api.github.com/repos/' + this.repo + '/pulls/pullRequestNumber?access_token=' + this.github.accessToken)
      .map(res => res.json());
  }

}
