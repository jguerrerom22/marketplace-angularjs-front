import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserlogService } from '../../../shared/userlog.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  password = ''
  rpassword = ''
  testPassword = '';

  email = '';
  testEmail = '';
  tokenGenerated = false;
  sendOk = false;

  sub: any;
  tokenConfirmation = '';

  textsuccess = '';
  constructor(public userlog: UserlogService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.tokenConfirmation = params['id'];
    });
    if(this.tokenConfirmation !== 'reset') {
      this.tokenGenerated = true;
    }
  }

  resetText(variable) {
    this[variable] = '';
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  sendPassword() {
    if(this.password) {
      if(this.password === this.rpassword) {
        this.authService.changePassword(this.tokenConfirmation, this.password).subscribe(
          datos => {
            this.sendOk = true;
            this.textsuccess = 'passwordChangedOk';
          }, error => {
            this.testPassword = 'errorPassword'
          }
        )
      } else {
        this.testPassword = 'passwordsnotmatch';
      }
    } else {
      this.testPassword = 'passwordnecesary';
    }
    
  }


  sendInformation(token) {
    if(this.validateEmail(this.email) && this.email) {
      this.authService.sendEmailChangePassword(this.email, token).subscribe(
        datos => {
          this.sendOk = true;
          this.textsuccess = 'emailPasswordSendOk';
        }, error => {
          this.authService.handleErrorRequest(error);
          console.log(error);
          
          if(error.error.message === 'The user with the given email was not found') {
            this.testEmail = 'errorCorreo';
          }
        }
      )
    } else {
      this.testEmail = 'emailinvalid';
    }    
  }

  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }

}
