import { PersonFormGroupService } from './_services/person-form-group.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { InteractiveTableComponent } from './_components/interactive-table/interactive-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonFormComponent } from './_components/person-form/person-form.component';

@NgModule({
  declarations: [
    AppComponent,
    InteractiveTableComponent,
    PersonFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    PersonFormGroupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
