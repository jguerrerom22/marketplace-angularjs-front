import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { sha256 } from 'js-sha256';

import { environment } from './../../environments/environment'
import { LocalStorage as lstge } from './../shared/local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  deviceInfo = this.deviceService.getDeviceInfo();
  
  constructor(protected http: HttpClient, private deviceService: DeviceDetectorService) { }

  protected async getHttpRequestOptions() {

    let headers = {};
    if (lstge.get('token_app')){
      headers['X-Auth-Token'] = lstge.get('token_app');
    } else {
      if (!lstge.get('visitor_token')){
        const deviceId = sha256(JSON.stringify(this.deviceInfo));
        const visitorToken = await this.visitorlogin(deviceId);
        lstge.set('visitor_token', visitorToken['token']);
      }
      headers['Visitor-Id'] = lstge.get('visitor_token');
    }

    return { headers: new HttpHeaders(headers) };
  }

  public handleErrorRequest(error): void {
    switch (error.status){
      case 400: 
        console.log('Invalid Token');
        //localStorage.removeItem('token_app');
        break;
      case 401: 
        console.log('Access denied. No token provided');
        break;
      case 404: 
        console.log('Resource not found');
        break;
    }
  }

  /**
   * Solicitud de token para usuario no registrado
   * @param id La id unica del dispositivo
   */
  public async visitorlogin(id: string) {
    const url = 'auth/visitor';
    return await this.http.post(environment.apiUrl + url, {id}, {}).toPromise();
  }
}