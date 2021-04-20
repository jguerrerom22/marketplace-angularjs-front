import { Injectable } from '@angular/core';

import { BaseService } from './base.service'
import { environment } from './../../environments/environment'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {

  googlelogin(token: string) {
    const url = 'auth/google';
    return this.http.post(environment.apiUrl + url, {token}, {});
  }

  facebooklogin(token: string) {
    const url = 'auth/facebook';
    return this.http.post(environment.apiUrl + url, {token}, {});
  }

  /**
   * Petición de login
   * @param email Correo electrónico del usuario
   * @param password Contraseña del usuario
   */
  signinkuvid(email: string, password: string) {
    const url = 'auth';
    return this.http.post(environment.apiUrl + url, {email, password}, {});
  }

  /**
   * 
   */
  registerKuvid(firstName, lastName, email, password) {
    const url = 'users'
    let jsonSend =  {firstName, lastName, email, password}
    return this.http.post(environment.apiUrl + url, jsonSend, {});
  }

  /**
   * Recibe el token enviado por el correo electrónico
   * @param token 
   */
  userConfirmation(token) {
    const url = 'users/confirmation'
    return this.http.post(environment.apiUrl + url, {token}, {});
  }

  /**
   * Reenviar el correo elctrónico
   * @param email 
   */
  async userResendConfirmation(email: string) {
    const url = 'users/resendConfirmation'
    return this.http.post(environment.apiUrl + url, {email}, await this.getHttpRequestOptions())
  }

  /**
   * Send email for Changing Password
   * @param email 
   * @param token 
   */
  sendEmailChangePassword(email: string, token: string) {
    const url = 'auth/forgotPassword';
    return this.http.post(environment.apiUrl + url, {email, token}, {})
  }

  /**
   * Change password of user
   * @param token 
   * @param password 
   */
  changePassword(token, password) {
    const url = 'users/me/password'
    let headers = {
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    };
    return this.http.post(environment.apiUrl + url, {password}, {headers: new HttpHeaders(headers)})
  }
}