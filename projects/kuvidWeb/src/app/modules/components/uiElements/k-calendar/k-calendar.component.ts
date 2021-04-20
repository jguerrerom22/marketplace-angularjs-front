import { Component, OnInit, Input } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-k-calendar',
  templateUrl: './k-calendar.component.html',
  styleUrls: ['./k-calendar.component.sass'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class KCalendarComponent implements OnInit {
  @Input() model = '';
  @Input() placeHolder = '';
  constructor() { }

  ngOnInit(): void {
  }

}
