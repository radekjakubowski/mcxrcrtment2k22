import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-short-answer',
  templateUrl: './short-answer.component.html',
  styleUrls: ['./short-answer.component.scss']
})
export class ShortAnswerComponent implements OnInit {
  public question: string;
  public description: string;
  public answer = new EventEmitter<boolean>();

  constructor(public modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  public yes(): void {
    this.answer.emit(true);
    this.modalRef.hide();
  }

  public no(): void {
    this.answer.emit(false);
    this.modalRef.hide();
  }
}
