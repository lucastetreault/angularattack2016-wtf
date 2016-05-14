import {Component, OnInit } from '@angular/core';
import {PullsService} from '../pulls.service';
import {PullRequestComponent} from '../pull-request/pull-request.component';

@Component({
  moduleId: module.id,
  selector: 'app-pull-request-list',
  templateUrl: 'pull-request-list.component.html',
  styleUrls: ['pull-request-list.component.css'],
  directives: [PullRequestComponent]
})

export class PullRequestListComponent implements OnInit {

  private pulls;

  constructor(private pullService: PullsService) {}

  ngOnInit() {
    this.pulls = this.pullService.getPullRequests();
  }

}
