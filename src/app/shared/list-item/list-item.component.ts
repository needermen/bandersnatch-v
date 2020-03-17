import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Scenario} from '../../bander-video/models/scenario';

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

  @Input() showButton = true;
  @Input() buttonName = 'ნახვა';
  @Input() item: Scenario;

  @Output() select: EventEmitter<string> = new EventEmitter<string>();
}
