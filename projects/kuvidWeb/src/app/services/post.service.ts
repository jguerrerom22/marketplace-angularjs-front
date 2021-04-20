import { Injectable } from '@angular/core';

import { BaseService } from './base.service'
import { environment } from './../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class PostService extends BaseService {

  /**
   * Create a post
   * @param data { media:[binary, binary,...], company: string, description: string }. [company, description] not mandatory
   */
  async postCreate(data: object){
    const url = `social/posts`;
    return await this.http.post(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Update a post
   * @param data { media:[binary, binary,...], company: string, description: string }. [company, description] not mandatory
   */
  async postUpdate(id: string, data: object){
    const url = `social/posts/${id}`;
    return await this.http.put(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Getting posts of vids page
   */

  async postAll(skip: number, limit: number, params: object){
    let url = 'social/posts?skip=' + skip + '&limit='+ limit;
    if (params['city']) url += '&city=' + params['city'];
    if (params['company']) url += '&company=' + params['company'];
    
    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }

  /**
   * Getting a post
   */

  async postGetOne(id: string){
    const url = 'social/posts/' + id;
    return await this.http.get(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }

  /**
   * Save a review on post
   */
  async postReviewCreate(id: string, comment: string) {
    const url = 'social/posts/' + id + '/review';
    return await this.http.post(environment.apiUrl + url, { comment }, await this.getHttpRequestOptions()).toPromise();
  }
}