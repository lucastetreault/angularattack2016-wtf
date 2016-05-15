import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {DiffService} from './diff-service.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


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
    let that = this;

    return new Observable(observer => {
      that.pullRequests.subscribe(pulls => {
        pulls = pulls.filter(pull => pull.number == pullRequestNumber);
        observer.next(pulls[0]);
      });
    }
    );
  }

}
