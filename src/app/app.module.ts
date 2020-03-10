import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ListComponent} from './list/list.component';
import {BanderVideoComponent} from './bander-video/bander-video.component';
import {JsonFileReaderService} from './bander-video/json-file-reader.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    BanderVideoComponent,
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
