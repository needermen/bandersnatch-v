import {Component, OnInit} from '@angular/core';
import {JsonFileReaderService} from '../../../shared/services/json-file-reader.service';
import {Scenario} from '../../models/scenario';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Scenario[];
  selectedId: string;
  isDesktop: boolean;

  constructor(private jsonFileReaderService: JsonFileReaderService, private deviceService: DeviceDetectorService) {
    this.list = this.jsonFileReaderService.getAllScenarios();
    this.isDesktop = this.deviceService.isDesktop();
  }

  ngOnInit() {
  }

  select(id: string) {
    this.selectedId = id;
  }
}
