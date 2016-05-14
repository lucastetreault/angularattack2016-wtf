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
  diffs = [];

  constructor(private diffService: DiffService) {
    this.diffs = [];
  }

  ngOnInit() {
  }

  routerOnActivate(curr: RouteSegment) {
    this.pullRequestId = curr.getParam('pullRequestId');

    let that = this;

    this.diffService.getDiff(this.pullRequestId).subscribe(res => {
      let lines = res.diff.split(/\r?\n/);

      let diff;

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
        } else if (line.startsWith('index')){
          // Uh, what does this one mean? 
        } else if (line.startsWith('---') || line.startsWith('+++')) {
          // Do nothing I guess? 
        } else if (line.startsWith('  ')) {

          diff = this.balanceDiff(diff);
          diff.lines.left.push({ number: '', text: line });
          diff.lines.right.push({ number: '', text: line });
        } else if (line.startsWith('+ ')) {
          diff.lines.right.push({number: '',
                    text: line,
                    color: '#eaffea',
                    lineNumberColor: '#dbffdb' });
        } else if (line.startsWith('- ')) {
          diff.lines.left.push({ number: '',
                    text: line,
                    color: '#ffecec',
                    lineNumberColor: '#ffdddd' });
        }
      });

      if (diff) {
        diff = this.balanceDiff(diff);
        that.diffs.push(diff);
      }
    }
    );
  }

  private balanceDiff(diff){
    while (diff.lines.right.length < diff.lines.left.length) {
      diff.lines.right.push({ number: '', text: ''});
    }

    while (diff.lines.left.length < diff.lines.right.length) {
      diff.lines.left.push({ number: '', text: ''});
    }

    return diff;
  }

}
