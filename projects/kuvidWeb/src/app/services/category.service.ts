import { Injectable } from '@angular/core';

import { BaseService } from './base.service'
import { environment } from './../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends BaseService {

  /**
   *  Getting categories of products on home page
   * Llamara categorias productos
   */
  async productCategoriesAll() {
    const url = 'categories?type=product'
    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }

  /**
   *  Getting categories of services on home page
   */
  async serviceCategoriesAll() {
     const url = 'categories?type=service';
    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }

  /**
   *  Getting only categories
   */
  async categoriesCompany(company: string) {
    const url = 'items/categories?company=' + company;
    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }
}