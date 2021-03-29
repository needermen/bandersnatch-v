import {NgModule} from '@angular/core';
import {MobileIsNotSupportedComponent} from './components/mobile-is-not-supported/mobile-is-not-supported.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ListComponent} from './components/bander-list/list.component';
import {BanderVideoComponent} from './components/bander-item/bander-video.component';
import {DeviceDetectorModule} from 'ngx-device-detector';

@NgModule({
  declarations: [
    ListComponent,
    BanderVideoComponent,
    MobileIsNotSupportedComponent
  ],
  imports: [
    SharedModule,
    DeviceDetectorModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', pathMatch: 'full', component: ListComponent
      },
      {
        path: ':id', component: BanderVideoComponent
      }
    ])
  ]
})
export class FrontModule {
}
