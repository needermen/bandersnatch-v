import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scenario} from '../../front/models/scenario';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.scss']
})
export class ConfigListComponent implements OnInit {
  faPlus = faPlus;

  @Input() scenarios: Scenario[];
  @Output() select = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() add = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }


}
