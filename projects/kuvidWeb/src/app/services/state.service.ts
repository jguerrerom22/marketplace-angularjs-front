import { Injectable } from '@angular/core';

import { BaseService } from './base.service'
import { environment } from './../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class StateService extends BaseService {

  /**
    * Get a list of states of a country
    * @param country ID of country
    */
  async statesAll(country: string) {
    const url = 'cities/states/' + country;
    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }
}