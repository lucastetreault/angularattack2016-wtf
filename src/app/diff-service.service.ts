import { Injectable, Input} from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class DiffService {
  private diffs = {};

  constructor(private http: Http) { }

  getDiff(pullRequestId) {
    let diffs = this.getDiffFromCache(pullRequestId);
    if (diffs.length !== 0) {
      return new Observable(observer => observer.next(diffs));
    }

    return this.http.request('http://ec2-52-37-59-24.us-west-2.compute.amazonaws.com:8080/diff/' + pullRequestId)
      .map(res => res.json())
      .map(res => this.mapDiff(res, pullRequestId));
  }

  update(pullRequestId, diff) {
    this.diffs[pullRequestId] = diff;
  }

  approve(pullRequestId) {
    this.diffs[pullRequestId].approved = true;
    this.diffs[pullRequestId].rejected = false;
  }

  decline(pullRequestId) {
    this.diffs[pullRequestId].approved = false;
    this.diffs[pullRequestId].rejected = true;
  }

  private getDiffFromCache(pullRequestId) {
    if (this.diffs[pullRequestId]) {
      return this.diffs[pullRequestId];
    } else {
      return [];
    }
  }

  private mapDiff(res, pullRequestId) {
    let diffs = [];

    let lines = res.diff.split(/\r?\n/);

    let diff;
    let leftLines;
    let rightLines;

    lines.forEach(line => {
      if (line.startsWith('diff')) {
        if (diff) {
          diffs.push(diff);
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
    
    diff.lines.left = diff.lines.left.map(line => {
      for(let i = 80; i < line.text.length ; i += 80){
        line.text = line.text.substr(0,i) + '\n' + line.text.substr(i += 1)
      }
    })
    
    diffs.push(diff);
    this.update(pullRequestId, diffs);
    return diffs;
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
