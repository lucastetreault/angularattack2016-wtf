import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class PullsService {

  constructor(private http: Http) {}

  getPullRequests(){
    return this.http.get('https://api.github.com/repos/angular/angular/pulls')
      .map(res => res.json());
  }

}
