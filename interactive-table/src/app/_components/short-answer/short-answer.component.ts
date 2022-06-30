import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-short-answer',
  templateUrl: './short-answer.component.html',
  styleUrls: ['./short-answer.component.scss']
})
export class ShortAnswerComponent implements OnInit {
  public answer = new EventEmitter<boolean>();

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  yes() {
    this.answer.emit(true);
  }

  no() {
    this.answer.emit(false);
  }
}
