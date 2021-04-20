import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-k-select',
  templateUrl: './k-select.component.html',
  styleUrls: ['./k-select.component.sass'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class KSelectComponent implements OnInit {

  @Input() items = [];
  @Input() model = '';
  @Input() clear = true;
  @Input() placeHolder = '';
  @Input() autocomplete = false;
  @Input() optionValue = '';
  @Output() modelChange = new EventEmitter();

  constructor(public translate: TranslateService) { }

  ngOnInit(): void { }

  selected() {
    this.modelChange.emit(this.model);
  }
}
