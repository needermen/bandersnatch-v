import {Component, OnInit, ViewChild} from '@angular/core';
import {JsonFileReaderService} from '../shared/services/json-file-reader.service';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import {Scenario} from '../front/models/scenario';
import {ConfigService} from './services/config.service';
import {Answer} from '../front/models/video';

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

  @ViewChild(JsonEditorComponent) jsonEditor: JsonEditorComponent;

  constructor(private jsonFileReaderService: JsonFileReaderService,
              private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.scenarios = this.configService.getLocalScenarios() || this.jsonFileReaderService.getAllScenarios();
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
      this.configService.saveInLocal(this.scenarios);
    };
  }

  updateScenario() {
    this.configService.saveInLocal(this.scenarios);
    this.editorData = this.selected || this.scenarios;
  }

  select(id: string) {
    this.selected = this.scenarios.filter(sc => sc.id === id)[0];
    this.updateScenario();
  }

  delete(id: string) {
    if (confirm('ნამდვილად გინდა წაშლა')) {
      this.scenarios = this.scenarios.filter(it => it.id !== id);
      this.updateScenario();
    }
  }

  unSelect() {
    this.selected = null;
    this.updateScenario();
  }

  add() {
    const newScenario = {
      id: this.generate(5),
      title: 'new Scenario',
      img: '',
      play: {
        id: 'jwPlayer id',
        url: 'string',
        hls: true,
        question: 'კითხვა',
        answers: [
          {
            text: 'პასუხი',
            play: {}
          }
        ]
      }
    } as Scenario;

    this.scenarios = [...this.scenarios, newScenario];
    this.updateScenario();
  }

  generate(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
