import { Component, OnInit } from '@angular/core';
import {OnActivate, RouteSegment} from '@angular/router';
import {DiffService} from '../diff-service.service';
import {WtfImagesService} from './wtf-images.service';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {PullsService} from '../pulls.service';

@Component({
  moduleId: module.id,
  selector: 'app-code-compare',
  templateUrl: 'code-compare.component.html',
  styleUrls: ['code-compare.component.css'],
  providers: [WtfImagesService],
  directives: [ROUTER_DIRECTIVES]
})
export class CodeCompareComponent implements OnInit, OnActivate {

  pullRequestId;
  diffs;
  pullRequest;

  constructor(private diffService: DiffService, private wtfImageService: WtfImagesService, private pullsService: PullsService) {
  }

  ngOnInit() { }

  routerOnActivate(curr: RouteSegment) {
    this.pullRequestId = curr.getParam('pullRequestId');

    this.pullRequest = this.pullsService.getPullRequestDetails(this.pullRequestId);
    this.diffs = this.diffService.getDiff(this.pullRequestId);

    this.diffs.subscribe(diffs => {
      debugger;
    })
  }

  randomWtf(diff) {
    if (diff.imgSrc) {
      diff.imgSrc = false;
      return;
    }
    diff.imgSrc = this.wtfImageService.getRandom();
    this.diffService.update(this.pullRequestId, this.diffs);
  }

  approve() {
    this.diffService.approve(this.pullRequestId);
  }

  reject() {
    this.diffService.decline(this.pullRequestId);
  }

}
