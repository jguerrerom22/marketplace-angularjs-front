import { Injectable } from '@angular/core';

import { BaseService } from './base.service'

@Injectable({
    providedIn: 'root'
})
export class UtilService extends BaseService {

  async basicRequest(url: string) {
    return await this.http.get(url).toPromise();
  }
  
  documentTypes() {
    return [
      { id: 'CC', name: 'CC' },
      { id: 'NIT', name: 'NIT' },
      { id: 'CE', name: 'CE' },
      { id: 'PPN', name: 'PPN' }
    ]
  }

  personType() {
    return [ 
      { id: '0', name: 'Natural' },
      { id: '1', name: 'Jurídica' }
    ];
  } 
}