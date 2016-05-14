import { Component, OnInit, Input } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-pull-request',
  templateUrl: 'pull-request.component.html',
  styleUrls: ['pull-request.component.css'],
    directives: [ROUTER_DIRECTIVES]

})
export class PullRequestComponent implements OnInit {

  @Input()
  pull;

  constructor() {}

  ngOnInit() {
  }

}
