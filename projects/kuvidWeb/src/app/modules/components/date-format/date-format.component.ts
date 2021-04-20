import { Component, OnChanges, Input } from '@angular/core';
import { es } from 'date-fns/locale';
import { parseISO, format } from 'date-fns';

@Component({
  selector: 'app-date-format',
  templateUrl: './date-format.component.html',
  styleUrls: ['./date-format.component.sass']
})
export class DateFormatComponent implements OnChanges {

  @Input() createdAt: Date;
  options = {
    locale: es,
    addSuffix: true
  };
  dateFn: any;
  constructor() {
    
   }

  ngOnChanges(): void {
    this.dateFn = parseISO(this.createdAt.toString());
  }


}
