import { Component, OnInit } from '@angular/core';
import {OnActivate, RouteSegment} from '@angular/router';
import {DiffService} from './diff-service.service';

@Component({
  moduleId: module.id,
  selector: 'app-code-compare',
  templateUrl: 'code-compare.component.html',
  styleUrls: ['code-compare.component.css'],
  providers: [DiffService]
})
export class CodeCompareComponent implements OnInit, OnActivate{

  pullRequestId;
  diff;

  constructor(private diffService: DiffService) {}

  ngOnInit() {
  }

  routerOnActivate(curr: RouteSegment) {
    this.pullRequestId = curr.getParam('pullRequestId');
    this.diffService.getDiff(this.pullRequestId).subscribe(diff => 
    this.diff = diff );
  }

}
