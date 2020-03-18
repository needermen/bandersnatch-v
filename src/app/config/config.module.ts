import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigComponent} from './config.component';
import {SharedModule} from '../shared/shared.module';
import {NgJsonEditorModule} from 'ang-jsoneditor';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {ConfigListComponent} from './config-list/config-list.component';
import {ConfigService} from './services/config.service';
import {ConfigItemComponent} from './config-item/config-item.component';
import {RouterModule} from '@angular/router';
import { ConfigListItemComponent } from './config-list-item/config-list-item.component';

@NgModule({
  declarations: [ConfigComponent, ConfigListComponent, ConfigItemComponent, ConfigListItemComponent],
  imports: [
    OrganizationChartModule,
    NgJsonEditorModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', pathMatch: 'full', component: ConfigComponent
      }
    ])
  ],
  providers: [
    ConfigService
  ]
})
export class ConfigModule {
}
