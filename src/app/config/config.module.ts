import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigComponent} from './config.component';
import {SharedModule} from '../shared/shared.module';
import {NgJsonEditorModule} from 'ang-jsoneditor';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { ConfigListComponent } from './config-list/config-list.component';
import {ConfigService} from './services/config.service';
import { ConfigItemComponent } from './config-item/config-item.component';

@NgModule({
  declarations: [ConfigComponent, ConfigListComponent, ConfigItemComponent],
  exports: [
    ConfigComponent
  ],
  imports: [
    CommonModule,
    OrganizationChartModule,
    SharedModule,
    NgJsonEditorModule
  ],
  providers: [
    ConfigService
  ]
})
export class ConfigModule {
}
