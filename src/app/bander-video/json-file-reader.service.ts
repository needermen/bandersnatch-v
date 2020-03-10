import {Injectable} from '@angular/core';
// @ts-ignore
import scenarios from '../../data.json';
import {Node} from './node';
import {Scenario} from './scenario';

@Injectable({
  providedIn: 'root'
})
export class JsonFileReaderService {
  scenarios: Scenario[];

  constructor() {
    this.scenarios = scenarios as Scenario[];
    console.log(this.scenarios);
  }

  getFirst(scenarioId: string): Node {
    const scenario = this.getScenario(scenarioId);
    if (scenario) {
      return scenario.data[0] as unknown as Node;
    }
  }

  getById(scenarioId: string, id: string): Node {
    const scenario = this.getScenario(scenarioId);
    if(scenario) {
      const nodes = scenario.data as unknown as Node[];
      return nodes.filter(n => n.id === id)[0];
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
