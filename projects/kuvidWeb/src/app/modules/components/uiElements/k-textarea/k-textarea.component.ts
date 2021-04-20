import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-k-textarea',
  templateUrl: './k-textarea.component.html',
  styleUrls: ['./k-textarea.component.sass'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class KTextareaComponent implements OnInit {
  @Input() model = '';
  @Output() modelChange = new EventEmitter();
  @Input() text = '';
  @Input() inputtype = '';
  @Input() rows: Number = 4;

  constructor() { }

  ngOnInit(): void {
  }

  inputedit() {
    this.modelChange.emit(this.model);
  }

}
