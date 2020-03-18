import {Injectable} from '@angular/core';
import {Scenario} from '../../front/models/scenario';

@Injectable()
export class ConfigService {

  constructor() {

  }

  saveInLocal(scenarios: Scenario[]) {
    localStorage.setItem('scenarios', JSON.stringify(scenarios));
  }

  getLocalScenarios(): Scenario[] {
    return JSON.parse(localStorage.getItem('scenarios')) as Scenario[];
  }

}
