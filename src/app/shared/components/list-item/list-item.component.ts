import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Scenario} from '../../../front/models/scenario';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input() hideButton = false;
  @Input() item: Scenario;
  @Output() select: EventEmitter<string> = new EventEmitter<string>();
}
