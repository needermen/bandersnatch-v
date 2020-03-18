import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scenario} from '../../front/models/scenario';

@Component({
  selector: 'app-config-list-item',
  templateUrl: './config-list-item.component.html',
  styleUrls: ['./config-list-item.component.scss']
})
export class ConfigListItemComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input() item: Scenario;

  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
}
