import { Injectable } from '@angular/core';

import { BaseService } from './base.service'
import { environment } from './../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

  /**
   * Getting info of user token
   */
  async userMyInfo() {
    const url = 'users/me'
    return await this.http.get<object>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Update the profile picture of the current user
   * @param data { file: binary }
   */
  async userUpdateProfilePicture(data: object){
    const url = 'users/me/profilePicture';
    return await this.http.put<object>(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Update the current user
   * @param data object with the information of user
   */
  async userUpdate(data: object){
    const url = 'users/me';
    return await this.http.put(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Add an item to the user shopping cart
   * @param data { item: string, quantity: number, selectableFields: array }
   */
  async userCartAddItem(data: object){
    const url = 'users/cart';
    return await this.http.post<[]>(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

   /**
   * Update an item to the user shopping cart
   * @param data { item: string, quantity: number, selectableFields: array }
   */
  async userCartUpdateItem(item: string, data: any){
    const url = 'users/me/cart/' + item;
    return await this.http.put(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Add an item to the user shopping cart
   * @param data { item: string, quantity: number, selectableFields: array }
   */
  async userCartRemoveItem(item: string){
    const url = 'users/me/cart/' + item;
    return await this.http.delete(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * List the items of the user shopping cart
   */
  async userShoppingCart(){
    const url = 'users/cart';
    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * List the items of the user shopping cart group by company
   */
  async userShoppingCartByCompany(){
    const url = 'users/cartByCompany';
    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * List the companies of the user 
   */
  async userMyCompanies(){
    const url = 'users/me/companies';
    return await this.http.get(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Add a shipping information to the user/visitor
   * @param data Info of shipping
   */
  async userShippingCreate(data: object){
    const url = 'users/me/shipping';
    return await this.http.post(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Update a shipping information to the user/visitor
   * @param id Id of shipping address
   * @param data Info of shipping
   */
  async userShippingUpdate(id: string, data: object){
    const url = 'users/me/shipping/' + id;
    return await this.http.put(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  async userShippingRemove(id: string){
    const url = 'users/me/shipping/' + id;
    return await this.http.delete(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Get credit cards of the user
   * @param data Info of credit card
   */
  async userCreditCard() {
    const url = 'users/me/creditCard';
    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Add a credit card to the user
   * @param data Info of credit card
   */
  async userCreditCardCreate(data: object){
    const url = 'users/me/creditCard';
    return await this.http.post(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Update a credit card to the user
   * @param id Id of credit card
   * @param data Info of credit card
   */
  async userCreditCardUpdate(id: string, data: object){
    const url = 'users/me/creditCard/' + id;
    return await this.http.put(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Remove a credit card to the user
   * @param id Id of credit card
   */
  async userCreditCardRemove(id: string) {
    const url = 'users/me/creditCard/' + id;
    return await this.http.delete(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Current user follows a user/company
   * @param data { company: string }
   */
  async userFollow(data: object) {
    const url = 'users/me/follow';
    return await this.http.post<object>(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Current user unfollows a user/company
   * @param data { company: string }
   */
  async userUnfollow(data: object) {
    const url = 'users/me/unfollow';
    return await this.http.post(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }
}