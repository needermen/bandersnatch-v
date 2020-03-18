import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {JsonFileReaderService} from './shared/services/json-file-reader.service';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {ConfigModule} from './config/config.module';
import {SharedModule} from './shared/shared.module';
import {FrontModule} from './bander-video/front.module';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'bander'
      },
      {
        path: 'bander',
        loadChildren: () => import('./bander-video/front.module').then(m => m.FrontModule)
      },
      {
        path: 'admin-config',
        loadChildren: () => import('./config/config.module').then(m => m.ConfigModule)
      }

    ]),
    SharedModule,
  ],
  providers: [
    JsonFileReaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
