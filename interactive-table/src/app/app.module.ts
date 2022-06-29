import { PersonFormGroupService } from './_services/person-form-group.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { InteractiveTableComponent } from './_components/interactive-table/interactive-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonFormComponent } from './_components/person-form/person-form.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CreatePersonComponent } from './_components/create-person/create-person.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    InteractiveTableComponent,
    PersonFormComponent,
    CreatePersonComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ModalModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CookieService,
    PersonFormGroupService,
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
