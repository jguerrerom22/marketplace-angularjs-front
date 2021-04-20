import { Injectable } from '@angular/core';

import { BaseService } from './base.service'
import { environment } from './../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ItemService extends BaseService {

  /**
   * Getting information of an item
   * @param id 
   */
  async itemInfo(id: string){
    const url = `items/${id}`;
    return await this.http.get<object>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Create a new product or service
   * @param data object
   */
  async itemCreate(data: object){
    const url = 'items';
    return await this.http.post(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  async itemUpdate(id: string, data: object) {
    const url = 'items/' + id;
    return await this.http.put(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }
  

  /**
   * Get a list of items
   * @param filters 
   * @param skip 
   * @param limit 
   */
  async itemList(filters: object, skip: number, limit: number){
    var url = 'items?skip=' + skip + '&limit=' + limit;
    for (var x in filters) url += `&${x}=${filters[x]}`;

    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }

  /**
   * Create a review of item
   * @param id ID of item
   * @param comment Text with the comment
   */
  async itemReviewCreate(id: string, comment: string){
    const url = 'items/' + id + '/review';
    return await this.http.post(environment.apiUrl + url, { comment }, await this.getHttpRequestOptions()).toPromise();
  }

  /**
   * Get list of items and categories
   * @param filters array of filters eg: company
   */
  async itemsAndCategories(filters: any) {
    let url = `items/categoriesAndItems?1`;
    for (var x in filters) url += `&${x}=${filters[x]}`;
    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }

  /**
   * Call products on post
   */
  async postItemsAll(id: string) {
    const url = 'items/categories?company=' + id;
    return await this.http.get(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }
}