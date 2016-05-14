import { Injectable, Input} from '@angular/core';
import {Jsonp} from '@angular/http';

@Injectable()
export class DiffService{

  constructor(private jsonp: Jsonp) {}

  getDiff(pullRequestId) {
    return this.jsonp.request('https://github.com/angular/angular/pull/' + pullRequestId + '.diff')
          .map(res => res.json());
  }
}
