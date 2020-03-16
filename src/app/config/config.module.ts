import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigComponent} from './config.component';
import {TreeModule} from 'primeng';

@NgModule({
  declarations: [ConfigComponent],
  exports: [
    ConfigComponent
  ],
  imports: [
    CommonModule,
    TreeModule
  ]
})
export class ConfigModule {
}
