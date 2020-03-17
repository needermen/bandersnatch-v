import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scenario} from '../../bander-video/models/scenario';
import {JsonFileReaderService} from '../../bander-video/services/json-file-reader.service';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.scss']
})
export class ConfigListComponent implements OnInit {

  @Input() scenarios: Scenario[];
  @Output() select = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }


}
