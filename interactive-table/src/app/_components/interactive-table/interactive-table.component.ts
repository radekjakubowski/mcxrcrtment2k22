import { PersonController } from './../../_backend/_controller/person-controller.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from '../../_models/person';

@Component({
  selector: 'app-interactive-table',
  templateUrl: './interactive-table.component.html',
  styleUrls: ['./interactive-table.component.scss']
})
export class InteractiveTableComponent implements OnInit {
  public people$: Observable<Person[]> | undefined;

  constructor(private peopleController: PersonController) {
    this.people$ = of(this.peopleController.getAll());
  }

  ngOnInit(): void {
  }

}
