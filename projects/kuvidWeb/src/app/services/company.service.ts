import { Injectable } from '@angular/core';

import { BaseService } from './base.service'
import { environment } from './../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends BaseService {

  /**
   * Get a company info
   * @param data object with the information of company
  */
  async companyInfo(id: string){
    const url = 'companies/' + id;
    return await this.http.get<object>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Create a company
   * @param data object with the information of company
   */
  async companyCreate(data: object){
    const url = 'companies';
    return await this.http.post(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Update a company
   * @param id ID of company
   * @param data Data of company
   */
  async companyUpdate(id: string, data: object){
    const url = `companies/${id}`;
    return await this.http.put(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Modify the logo of a company
   * @param id ID of company
   * @param data { logo: binary }
   */
  async companyUpdateLogo(id: string, data: object){
    const url = `companies/${id}/logo`;
    return await this.http.put(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Modify the cover picture of a company
   * @param id ID of company
   * @param data { cover: binary }
   */
  async companyUpdateCoverPicture(id: string, data: object){
    const url = `companies/${id}/cover`;
    return await this.http.put(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * List all the companies with status = pending
   */
  async companyToActivate(){
    const url = `companies?status=pending`;
    return await this.http.get(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Activate or not a company with status pending
   * @param id ID of the company
   * @param data { isApproved: boolean, notes: string }
   */
  async companyActivate(id: string, data: object){
    const url = `companies/${id}/activate`;
    return await this.http.put(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Rate a company
   * @param id ID of the company
   * @param data { rate: number, comment: string }
   */
  async companyRate(id: string, data: object){
    const url = `companies/${id}/review`;
    return await this.http.post<any>(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }
}