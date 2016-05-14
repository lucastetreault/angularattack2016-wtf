import { Injectable, Input} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class DiffService {

  constructor(private http: Http) {}

  getDiff(pullRequestId) {
    return this.http.request('http://ec2-52-37-59-24.us-west-2.compute.amazonaws.com:8080/diff/' + pullRequestId)
          .map(res => res.json());
  }
}
