import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {JsonFileReaderService} from './shared/services/json-file-reader.service';
import {SharedModule} from './shared/shared.module';
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
        loadChildren: () => import('./front/front.module').then(m => m.FrontModule)
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
