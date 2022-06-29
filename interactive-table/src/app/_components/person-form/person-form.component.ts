import { ControlBase } from './../../_utilitites/control-base';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[appPersonForm]',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  inputs: ["controls"]
})
export class PersonFormComponent implements OnInit {
  public controls: ControlBase<string>[];

  constructor() { }

  ngOnInit(): void {
  }

}
