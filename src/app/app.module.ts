import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ListComponent} from './list/list.component';
import {BanderVideoComponent} from './bander-video/bander-video.component';
import {JsonFileReaderService} from './bander-video/services/json-file-reader.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {MobileIsNotSupportedComponent} from './mobile-is-not-supported/mobile-is-not-supported.component';
import {ConfigModule} from './config/config.module';
import {ListItemComponent} from './shared/list-item/list-item.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    BanderVideoComponent,
    MobileIsNotSupportedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ConfigModule,
    SharedModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    JsonFileReaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
