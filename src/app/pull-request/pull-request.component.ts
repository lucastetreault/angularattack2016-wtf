import { Component, OnInit, Input } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DiffService} from '../diff-service.service';

@Component({
  moduleId: module.id,
  selector: 'app-pull-request',
  templateUrl: 'pull-request.component.html',
  directives: [ROUTER_DIRECTIVES]

})
export class PullRequestComponent implements OnInit {

  @Input()
  pull;

  diff;

  constructor(private diffService: DiffService) {
  }

  ngOnInit() {
    this.diff = this.diffService.getCachedDiff(this.pull.number);
  }

}
