import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {DiffService} from './diff-service.service';

@Injectable()
export class PullsService {
  private pullRequests;
  pulls = {};

  constructor(private http: Http, private diffService: DiffService) {
    this.pullRequests = this.http.get('https://api.github.com/repos/angular/angular/pulls')
      .map(res => res.json());

    this.pullRequests.subscribe(pullRequests => {
      pullRequests.forEach(pullRequest => {
        this.pulls[pullRequest.number] = pullRequest;
      });
    });
  }

  getPullRequests() {
    return this.pullRequests;
  }

  getPullRequestDetails(pullRequestNumber) {
    return this.pulls[pullRequestNumber];
  }

}
