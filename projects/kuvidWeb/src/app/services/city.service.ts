import { Injectable } from '@angular/core';

import { BaseService } from './base.service'
import { environment } from './../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class CityService extends BaseService {

  /**
  * Get a list of states of a country
  * @param country ID of country
  */
 async citiesAll(country: string) {
    const url = 'cities?country=' + country;
    return await this.http.get(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }

  async citiesAllByState(state: string) {
    const url = 'cities?state=' + state;
    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }
}