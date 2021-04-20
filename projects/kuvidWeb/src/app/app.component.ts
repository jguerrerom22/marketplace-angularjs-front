import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { sha256, sha224 } from 'js-sha256';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'kuvidWeb';
  deviceInfo: any;
  temp: any;
  // tslint:disable: max-line-length
  constructor(private translate: TranslateService,  private deviceService: DeviceDetectorService, private router: Router) {}
 
  async ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
    this.translate.setDefaultLang('es');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    // if (localStorage.getItem('visitor_token')) {
      
    // } else {

    //   //this.getVisitorToken().then(data => console.log(data));
    //   const datos = await this.connect.visitorlogin(sha256(JSON.stringify(this.deviceInfo)));
    //   this.temp = datos;
    //   localStorage.setItem('visitor_token', this.temp.token);
      
    //   //visitorAuthPromise.then((data) => console.log(data)).catch((error) => console.log(error));
    // }
    // console.log('ya tengo el token', localStorage.getItem('visitor_token'));
  }

  getVisitorToken() {
    console.log('haciendo la promesa');
    
    return new Promise((resolve, reject) => {
       
    });
    
  }
}
