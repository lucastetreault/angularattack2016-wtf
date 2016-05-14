import { Component, OnInit } from '@angular/core';
import {OnActivate, RouteSegment} from '@angular/router';
import {DiffService} from './diff-service.service';
import {CodeCompareDiffComponent} from '../code-compare-diff/code-compare-diff.component';

@Component({
  moduleId: module.id,
  selector: 'app-code-compare',
  templateUrl: 'code-compare.component.html',
  styleUrls: ['code-compare.component.css'],
  providers: [DiffService],
  directives: [CodeCompareDiffComponent]
})
export class CodeCompareComponent implements OnInit, OnActivate{

  pullRequestId;
  diff = [];

  constructor(private diffService: DiffService) {
    this.diff = [];
  }

  ngOnInit() {
  }

  routerOnActivate(curr: RouteSegment) {
    this.pullRequestId = curr.getParam('pullRequestId');

    let that = this;

    this.diffService.getDiff(this.pullRequestId).subscribe(res => {
      let lines = res.diff.split(/\r?\n/);

      let file;

      lines.forEach(line => {
        if (line.startsWith('diff')) {
          if (file) {
            that.diff.push(file);
          }

          file = {
            left: {
              lines: []
            },
            right: {
              lines: []
            }
          };
          let vars = line.split(' ');
          file.left.filename = vars[2];
          file.right.filename = vars[3];
        } else if (line.startsWith('index')){
          // Uh, what does this one mean? 
        } else if (line.startsWith('---') || line.startsWith('+++')) {
          // Do nothing I guess? 
        } else if (line.startsWith('  ')) {
          let diffLine = {
            number: 0,
            text: line
          };
          file.left.lines.push(diffLine);
          file.right.lines.push(diffLine);
        } else if (line.startsWith('+ ')) {
          let diffLine = {
            number: 0,
            text: line,
            color: '#eaffea',
            lineNumberColor: '#dbffdb'
          };
          file.left.lines.push({number: 0, text: ' '});
          file.right.lines.push(diffLine);
        } else if (line.startsWith('- ')) {
          let diffLine = {
            number: 0,
            text: line,
            color: '#ffecec',
            lineNumberColor: '#ffdddd'
          };
          file.left.lines.push(diffLine);
          file.right.lines.push({number: 0, text: ' '});
        }
      });

      if (file) {
        that.diff.push(file);
      }
    }
    );
  }

}
