import { Component, OnInit } from '@angular/core';
import {OnActivate, RouteSegment} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-code-compare',
  templateUrl: 'code-compare.component.html',
  styleUrls: ['code-compare.component.css']
})
export class CodeCompareComponent implements OnInit, OnActivate{

  pullRequestId;

  constructor() {}

  ngOnInit() {
  }

  routerOnActivate(curr: RouteSegment){
    this.pullRequestId = curr.getParam('pullRequestId');
  }

}
