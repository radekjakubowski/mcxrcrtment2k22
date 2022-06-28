import { PersonFormGroupService } from './_services/person-form-group.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { InteractiveTableComponent } from './_components/interactive-table/interactive-table.component';
import { DynamicFormPersonComponent } from './_components/dynamic-form-person/dynamic-form-person.component';
import { DynamicFormComponent } from './_components/dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InteractiveTableComponent,
    DynamicFormPersonComponent,
    DynamicFormComponent
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
