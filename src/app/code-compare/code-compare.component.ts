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
          file = {
            left: {},
            right: {}
          };
          let vars = line.split(' ');
          file.left.filename = vars[2];
          file.right.filename = vars[3];
        } else if (line.startsWith('index')){
          // Uh, what does this one mean? 
        } else if (true === false) {

        }
        that.diff.push(file);

      });
    }
    );
  }

}
