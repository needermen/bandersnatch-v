import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigComponent} from './config.component';
import {SharedModule} from '../shared/shared.module';
import {NgJsonEditorModule} from 'ang-jsoneditor';
import {OrganizationChartModule} from 'primeng/organizationchart';

@NgModule({
  declarations: [ConfigComponent],
  exports: [
    ConfigComponent
  ],
  imports: [
    CommonModule,
    OrganizationChartModule,
    SharedModule,
    NgJsonEditorModule
  ]
})
export class ConfigModule {
}
