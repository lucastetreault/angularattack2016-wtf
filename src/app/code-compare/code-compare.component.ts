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
  diffs = [];
  pullRequest;

  constructor(private diffService: DiffService, private wtfImageService: WtfImagesService, private pullsService: PullsService) {
  }

  ngOnInit() { }

  routerOnActivate(curr: RouteSegment) {
    this.pullRequestId = curr.getParam('pullRequestId');

    this.pullRequest = this.pullsService.getPullRequestDetails(this.pullRequestId);

    let that = this;

    this.diffs = this.diffService.getDiffFromCache(this.pullRequestId);

    if (this.diffs.length === 0) {
      this.diffService.getDiff(this.pullRequestId).subscribe(res => {
        let lines = res.diff.split(/\r?\n/);

        let diff;
        let leftLines;
        let rightLines;

        lines.forEach(line => {
          if (line.startsWith('diff')) {
            if (diff) {
              that.diffs.push(diff);
            }

            diff = {
              lines: {
                right: [],
                left: []
              }
            };
            let vars = line.split(' ');
            diff.filename = vars[2].substr(2);
          } else if (line.startsWith('index')) {
            // Uh, what does this one mean? 
          } else if (line.startsWith('---') || line.startsWith('+++')) {
            // Do nothing I guess? 
          } else if (line.startsWith('@@')) {
            let vars = line.split(' ');
            let left = vars[1].split(',');
            let right = vars[2].split(',');
            leftLines = left[0].substr(1);
            rightLines = right[0].substr(1);
            diff.lines.left.push({ summary: true, text: line });
            diff.lines.right.push({ summary: true, text: line });
          } else if (line.startsWith(' ')) {
            diff = this.balanceDiff(diff);
            diff.lines.left.push({ number: leftLines, text: line, showButton: false });
            diff.lines.right.push({ number: rightLines, text: line, showButton: false });
            leftLines++;
            rightLines++;
          } else if (line.startsWith('+')) {
            diff.lines.right.push({
              number: rightLines,
              text: line,
              color: '#eaffea',
              lineNumberColor: '#dbffdb', showButton: false
            });
            rightLines++;
          } else if (line.startsWith('-')) {
            diff.lines.left.push({
              number: leftLines,
              text: line,
              color: '#ffecec',
              lineNumberColor: '#ffdddd', showButton: false
            });
            leftLines++;
          }
        });

        diff = this.balanceDiff(diff);
        that.diffs.push(diff);
        that.diffService.update(that.pullRequestId, that.diffs);
      }
      );
    }
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

  private balanceDiff(diff) {
    while (diff.lines.right.length < diff.lines.left.length) {
      diff.lines.right.push({ number: '', text: '' });
    }

    while (diff.lines.left.length < diff.lines.right.length) {
      diff.lines.left.push({ number: '', text: '' });
    }

    return diff;
  }

}
