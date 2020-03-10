import {Component, OnInit} from '@angular/core';
import {JsonFileReaderService} from '../bander-video/json-file-reader.service';
import {Scenario} from '../bander-video/scenario';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Scenario[];
  selectedId: string;

  constructor(private jsonFileReaderService: JsonFileReaderService) {
    this.list = this.jsonFileReaderService.getAllScenarios();
  }

  ngOnInit() {
  }

  select(id: string) {
    this.selectedId = id;
  }
}
