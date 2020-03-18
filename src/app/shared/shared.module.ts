import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListItemComponent} from './list-item/list-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DeviceDetectorModule} from 'ngx-device-detector';


@NgModule({
  declarations: [
    ListItemComponent,
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    DeviceDetectorModule.forRoot()
  ],
  exports: [
    FontAwesomeModule,
    CommonModule,

    ListItemComponent
  ]
})
export class SharedModule {
}
