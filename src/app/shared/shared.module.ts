import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ListItemComponent} from './components/list-item/list-item.component';


@NgModule({
  declarations: [
    ListItemComponent
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
