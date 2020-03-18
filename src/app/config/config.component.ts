import {Component, OnInit, ViewChild} from '@angular/core';
import {JsonFileReaderService} from '../shared/services/json-file-reader.service';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import {Scenario} from '../front/models/scenario';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  scenarios: Scenario[];
  selected: Scenario;

  editorOptions: JsonEditorOptions;
  editorData: any;
  selectedEditorData: any;

  @ViewChild(JsonEditorComponent) jsonEditor: JsonEditorComponent;

  constructor(private jsonFileReaderService: JsonFileReaderService) {
  }

  ngOnInit(): void {
    this.scenarios = this.jsonFileReaderService.getAllScenarios();
    this.editorData = this.scenarios;

    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    this.editorOptions.mode = 'code';
    this.editorOptions.onChangeText = () => {
      if (this.selected) {
        Object.assign(this.selected, this.jsonEditor.get());
      } else {
        Object.assign(this.scenarios, this.jsonEditor.get());
      }
    };
  }

  select(id: string) {
    this.selected = this.scenarios.filter(sc => sc.id === id)[0];
    this.selectedEditorData = this.selected;
    this.editorData = this.selected;
  }

  unSelect() {
    this.selected = null;
    this.editorData = this.scenarios;
  }
}
