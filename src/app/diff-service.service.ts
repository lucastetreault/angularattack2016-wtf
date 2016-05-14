import { Injectable, Input} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class DiffService {
  private diffs = {};
  private details = {};

  constructor(private http: Http) { }

  getDiff(pullRequestId) {
    return this.http.request('http://ec2-52-37-59-24.us-west-2.compute.amazonaws.com:8080/diff/' + pullRequestId)
      .map(res => res.json());
  }

  getDiffFromCache(pullRequestId) {
    if (this.diffs[pullRequestId]) {
      return this.diffs[pullRequestId];
    } else {
      return [];
    }
  }

  update(pullRequestId, diff) {
    this.diffs[pullRequestId] = diff;
  }

  approve(pullRequestId) {
    this.diffs[pullRequestId].approved = true;
    this.diffs[pullRequestId].rejected = false;
  }

  decline(pullRequestId) {
    this.diffs[pullRequestId].approved = false;    
    this.diffs[pullRequestId].rejected = true;
  }
}
