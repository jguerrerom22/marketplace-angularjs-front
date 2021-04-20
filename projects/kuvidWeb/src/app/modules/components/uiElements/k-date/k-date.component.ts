import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-k-date',
  templateUrl: './k-date.component.html',
  styleUrls: ['./k-date.component.sass'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class KDateComponent implements OnInit {
  @Input() model = '';
  @Output() modelChange = new EventEmitter();
  @Input() text = 'birthdayInput';
  @Input() inputtype = 'text';

  constructor() { }

  ngOnInit(): void { }

  inputedit() {
    // this.type = 'text';
    let input = this.model;
    if (/\D\/$/.test(input)) { input = input.substr(0, input.length - 3); }
    const values = input.split('/').map((v) => {
      return v.replace(/\D/g, '');
    });
    if (values[0]) { values[0] = this.checkValue(values[0], 31); }
    if (values[1]) { values[1] = this.checkValue(values[1], 12); }
    const output = values.map((v, i) => {
      return v.length == 2 && i < 2 ? v + '/' : v;
    });
    this.model = output.join('').substr(0, 14);
    this.modelChange.emit(this.model);
  }


  checkValue(str, max) {
    if (str.charAt(0) !== '0' || str == '00') {
      let num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) { num = 1; }
      str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
    };
    return str;
  }

  bluredit() {
    // this.type = 'text';
    const input = this.model;
    const values = input.split('/').map((v, i) => {
      return v.replace(/\D/g, '');
    });
    let output = '';
  
    if (values.length == 3) {
      const year = values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2]);
      const day = parseInt(values[0]) ;
      const month = parseInt(values[1]) - 1;
      const d = new Date(year, month, day);
      if (!isNaN(d as any)) {
        // document.getElementById('result').innerText = d.toString();
        const dates = [ d.getDate(), d.getMonth() + 1, d.getFullYear()];
        output = dates.map((v) => {
          return v.toString().length == 1 ? '0' + v : v;
        }).join('/');
     }
    }
    this.model = output;
  }

}
