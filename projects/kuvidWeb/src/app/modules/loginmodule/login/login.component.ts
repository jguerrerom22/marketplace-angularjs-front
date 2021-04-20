import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { Router } from '@angular/router';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

import { UserlogService } from '../../../shared/userlog.service';
import { LocalStorage as lstge } from '../../../shared/local-storage.service';
import { AuthService as AuthKuvidService } from '../../../services/auth.service';
import { SocialAuthService } from '../../../services/social-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class LoginComponent implements OnInit {

  user = '';
  password = '';
  temp: any;
  error_text  = false;
  conteo = 0;
  typeLogin = '';
  private userSocial: SocialUser;
  private loggedIn: boolean;

  constructor(
    public userlog: UserlogService, 
    public router: Router, 
    private authKuvidService: AuthKuvidService, 
    private socialAuthService: SocialAuthService, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //this.connect.signOut();
    if (lstge.get('user_kuvid')) {
      this.router.navigate(['']);
    } else {
      
    }

    
  }

  metodoAuth(typeSocial) {
    this.authService.authState.subscribe((user) => {
      this.userSocial = user;
      this.loggedIn = (user != null);
      this.conteo ++;
      if (this.conteo > 1) {
        if (typeSocial === 'google') {
          this.authKuvidService.googlelogin(user.idToken).subscribe(
            datos => {
              this.temp = datos;
              lstge.delete('visitor_token');
              lstge.set('token_app', this.temp.token);
              lstge.set('user_kuvid', JSON.stringify(this.temp.user));
              this.router.navigate(['']);
            },
            error => {
              this.authKuvidService.handleErrorRequest(error);
            }
          );
        } else if (typeSocial === 'face') {
          this.authKuvidService.facebooklogin(user.authToken).subscribe(
            datos => {
              this.temp = datos;
              lstge.delete('visitor_token');
              lstge.set('token_app', this.temp.token);
              lstge.set('user_kuvid', this.temp.user);
              lstge.set('actived_account', this.temp.user);
              this.router.navigate(['']);
            },
            error => {
              this.authKuvidService.handleErrorRequest(error);
            }
          );
        }
      }
      
      if (this.loggedIn) {
        //this.router.navigate(['']);
      }
    });
  }

  login() {
    this.conteo = 0;
    this.metodoAuth('face');
    this.socialAuthService.signInWithFB();
  }

  loging() {
    this.conteo = 0;
    this.metodoAuth('google');
    this.socialAuthService.signInWithGoogle();
  }

  loginkuvid() {
    this.authKuvidService.signinkuvid(this.user, this.password).subscribe(
      datos => {
        this.temp = datos;
        lstge.delete('visitor_token');
        lstge.set('token_app', this.temp.token);
        lstge.set('user_kuvid', this.temp.user);
        lstge.set('actived_account', {
          id: this.temp.user.id,
          name: this.temp.user.firstName,
          fullName: this.temp.user.firstName + ' ' + this.temp.user.lastName,
          profilePicture: this.temp.user.profilePicture,
          is: 'user'
        })
        this.router.navigate(['']);
      }, 
      error => {
        this.error_text = true;
        this.authKuvidService.handleErrorRequest(error);
      }
    );
  }

}
