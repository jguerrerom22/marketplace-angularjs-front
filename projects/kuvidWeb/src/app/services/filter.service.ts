import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseService } from './base.service'

@Injectable({
    providedIn: 'root'
})
export class FilterService extends BaseService {

  filtersPrice(): Observable<object>{
    return of({
      prices :[ 
        {id: '1', name: 'Hasta $20,000', start: 0, end: 20000, active: false},
        {id: '2', name: '$20,000 - $50,000', start: 20000, end: 50000, active: false},
        {id: '3', name: '$50,000 - $100,000', start: 50000, end: 100000, active: false},
        {id: '4', name: '$100,000 - $200,000', start: 100000, end: 200000, active: false},
        {id: '5', name: '$200,000 en adelante', start: 200000, end: 0, active: false}
      ],
      disccounts: [
        {id: '1', name: 'Descuento del 10%', active: false},
        {id: '1', name: 'Descuento del 20%', active: false},
        {id: '1', name: 'Descuento del 50%', active: false},
        {id: '1', name: 'Descuento del 70%', active: false}
      ]
    })
  }
}