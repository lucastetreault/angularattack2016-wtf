import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-code-compare-diff',
  templateUrl: 'code-compare-diff.component.html',
  styleUrls: ['code-compare-diff.component.css']
})
export class CodeCompareDiffComponent implements OnInit {
  @Input()
  changes;

  constructor() {}

  ngOnInit() {
  }

}
