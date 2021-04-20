import { Injectable } from '@angular/core';

import { BaseService } from './base.service'
import { environment } from './../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ExperienceService extends BaseService {

  /**
   * Create an experience
   * @param data { company: string, description: string, file: binary }. [company, description] not mandatory
   */
  async experienceCreate(data: object){
    const url = `social/experiences`;
    return await this.http.post(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Llama a las historias
   */
  async experiencesAll(skip: number, limit: number) {
    const url = 'social/experiences?skip=' + skip + '&limit=' + limit;
    return await this.http.get<[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise();
  }
}