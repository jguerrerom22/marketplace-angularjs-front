import { Injectable } from '@angular/core';

import { BaseService } from './base.service'
import { environment } from './../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class BannerService extends BaseService {

  /**
   *  Getting list of banners for home page
   */
  async bannersAll() {
    const url = 'app/banners/'
    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }

}