import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-k-input',
  templateUrl: './k-input.component.html',
  styleUrls: ['./k-input.component.sass'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class KInputComponent implements OnInit {
  @Input() model = '';
  @Output() modelChange = new EventEmitter();
  @Input() text = '';
  @Input() placeHolder = '';
  @Input() inputtype = '';
  @Input() mask = '';

  constructor() { }

  ngOnInit(): void {
    if (this.placeHolder === ''){
      this.placeHolder = this.text;
    }
  }

  inputedit() {
    this.modelChange.emit(this.model);
  }

}
