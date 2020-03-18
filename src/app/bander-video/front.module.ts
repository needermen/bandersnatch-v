import {NgModule} from '@angular/core';
import {ListComponent} from './components/list/list.component';
import {BanderVideoComponent} from './bander-video.component';
import {MobileIsNotSupportedComponent} from './components/mobile-is-not-supported/mobile-is-not-supported.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ListComponent,
    BanderVideoComponent,
    MobileIsNotSupportedComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', pathMatch: 'full', component: ListComponent
      }
    ])
  ]
})
export class FrontModule {
}
