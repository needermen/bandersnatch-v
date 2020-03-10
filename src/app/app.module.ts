import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ListComponent} from './list/list.component';
import {BanderVideoComponent} from './bander-video/bander-video.component';
import {JsonFileReaderService} from './bander-video/services/json-file-reader.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { BanderVideoViewComponent } from './bander-video/bander-video-view/bander-video-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    BanderVideoComponent,
    BanderVideoViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [
    JsonFileReaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
