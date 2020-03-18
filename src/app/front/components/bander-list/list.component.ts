import {Component, OnInit} from '@angular/core';
import {JsonFileReaderService} from '../../../shared/services/json-file-reader.service';
import {Scenario} from '../../models/scenario';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Scenario[];
  selectedId: string;

  constructor(private jsonFileReaderService: JsonFileReaderService, private router: Router, private deviceService: DeviceDetectorService) {
    this.list = this.jsonFileReaderService.getAllScenarios();

  }

  ngOnInit() {
  }

  select(id: string) {
    this.router.navigate(['bander', id]);
    this.selectedId = id;
  }
}
