import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {DiffService} from './diff-service.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import {GithubService} from './github.service';


@Injectable()
export class PullsService {
  pulls = {};
  private repo = null;

  constructor(private http: Http, private diffService: DiffService, private github: GithubService) {
  }

  setRepo(repo) {
    this.repo = repo;
  }

  isRepoSet() {
    return this.repo !== null;
  }

  getPullRequests() {
    return this.http.get('https://api.github.com/repos/' + this.repo + '/pulls?access_token=' + this.github.accessToken)
      .map(res => res.json());
  }

  getPullRequestDetails(pullRequestNumber) {
    return this.http.get('https://api.github.com/repos/' + this.repo + '/pulls/' + pullRequestNumber + '?access_token=' + this.github.accessToken)
      .map(res => res.json());
  }

}
