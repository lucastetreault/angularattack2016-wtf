import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-pull-request',
  templateUrl: 'pull-request.component.html',
  styleUrls: ['pull-request.component.css']
})
export class PullRequestComponent implements OnInit {

  @Input()
  pull;

  constructor() {}

  ngOnInit() {
  }

}
