import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListItemComponent} from './list-item/list-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ListItemComponent,
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
  ],
  exports: [
    FontAwesomeModule,
    CommonModule,

    ListItemComponent
  ]
})
export class SharedModule {
}
