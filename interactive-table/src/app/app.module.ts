import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { InteractiveTableComponent } from './_components/interactive-table/interactive-table.component';

@NgModule({
  declarations: [
    AppComponent,
    InteractiveTableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
