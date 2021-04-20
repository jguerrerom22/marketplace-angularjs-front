import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { Router } from '@angular/router';

import { UserlogService } from '../../../shared/userlog.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class RegisterComponent implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  rpassword = '';

  profilePicture = '';
  gender = '';
  phoneNumber = '';

  testEmail = '';
  testfirstName = '';
  testlastName = '';
  testPassword = '';

  genders = [{id: 'male', name: 'Male'}, {id: 'female', name: 'Female'}, {id:'other', name: 'Otro'}];
  constructor(public userlog: UserlogService, public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerUser() {
    // tslint:disable: max-line-length
    if (this.firstName && this.lastName && this.validateEmail(this.email) && this.password && (this.password === this.rpassword)) {
        this.authService.registerKuvid(this.firstName, this.lastName, this.email, this.password).subscribe(
          datos => {
            this.router.navigate(['/user/confirmation', 'validate']);
          }, error => {
            
          }
        );
      } else {
        if (!this.email) {
          this.testEmail = 'emailnecessary';
        } else {
          if (this.validateEmail(this.email)) {

          } else {
            this.testEmail = 'emailinvalid';
          }
        }

        if (!this.firstName) {
          this.testfirstName = 'namenecessery';
        }

        if (!this.lastName) {
          this.testlastName = 'lastnecessery';
        }
        
        if (!this.password) {
          this.testPassword = 'passwordnecesary';
        } else {
          if (this.rpassword && (this.password === this.rpassword)) {

          } else {
            this.testPassword = 'passwordsnotmatch';
          }
        }
      }

    
    
  }

  resetText(variable) {
    this[variable] = '';
  }


  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
