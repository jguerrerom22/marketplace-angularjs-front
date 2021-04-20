import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of, Subscriber } from 'rxjs';
import { AuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  coloresLogo = {
    first: '#6D40F3',
    second: '#FE00C5',
    third: '#F72930'
  };
  apiUrl = 'https://kuvid-api.herokuapp.com/';
  constructor(private http: HttpClient) { }


  sendemail(name, email, city, token) {
    const url = 'campaigns/callToAction';
    return this.http.post(this.apiUrl + url, {name, email, city, token}, {});
  }
}
