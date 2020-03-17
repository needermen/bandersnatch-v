import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigComponent} from './config.component';
import {TreeModule} from 'primeng';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ConfigComponent],
  exports: [
    ConfigComponent
  ],
  imports: [
    CommonModule,
    TreeModule,
    SharedModule
  ]
})
export class ConfigModule {
}
