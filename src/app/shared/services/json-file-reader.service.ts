import {Injectable} from '@angular/core';
// @ts-ignore
import scenarios from '../../../data.json';
import {Scenario} from '../../front/models/scenario';
import {Video} from '../../front/models/video';

@Injectable({
  providedIn: 'root'
})
export class JsonFileReaderService {
  scenarios: Scenario[];

  constructor() {
    this.scenarios = scenarios as Scenario[];
  }

  getFirst(scenarioId: string): Video {
    const scenario = this.getScenario(scenarioId);
    if (scenario) {
      return scenario.play as unknown as Video;
    }
  }

  getAllScenarios(): Scenario[] {
    return scenarios as Scenario[];
  }

  getScenario(id: string): Scenario {
    const scenario = this.scenarios.filter(s => s.id === id);
    if (scenario.length > 0) {
      return scenario[0] as Scenario;
    }
    return null;
  }
}
