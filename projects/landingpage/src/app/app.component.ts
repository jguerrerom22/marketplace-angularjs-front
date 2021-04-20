import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { ConnectService } from './services/connect.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'landingpage';

  name = '';
  email = '';
  notes = '';
  isCompany = false;

  send = false;
  siteKey = 'google.com';

  constructor(private translate: TranslateService, public connect: ConnectService){}
  
  ngOnInit() {
  }
}
