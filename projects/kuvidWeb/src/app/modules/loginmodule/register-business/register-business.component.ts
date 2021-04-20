import { Component, OnInit } from '@angular/core';
import { UserlogService } from '../../../shared/userlog.service';

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.sass']
})
export class RegisterBusinessComponent implements OnInit {
  email = '';
  password = '';
  rpassword = '';
  companieName = '';
  legal = '';
  address = '';
  city = '';
  country = '';
  phone = '';
  mobile = '';
  sector = '1';
  constructor(public userlog: UserlogService) { }

  ngOnInit(): void {
  }

}
