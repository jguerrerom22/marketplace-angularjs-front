import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserlogService } from '../../../shared/userlog.service';
import { AuthService } from '../../../services/auth.service';
import { LocalStorage as lstge } from '../../../shared/local-storage.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.sass']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  sub: any;
  temp: any;
  tokenConfirmation = '';
  tokenExist = false;
  loading = false;

  emailResend = false;
  constructor(public userlog: UserlogService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.tokenConfirmation = params['id'];
    });
    console.log(this.tokenConfirmation);
    if (this.tokenConfirmation !== 'validate') {
      this.loading = true;
      this.authService.userConfirmation(this.tokenConfirmation).subscribe(
        datos => {
          this.temp = datos;
          lstge.set('token_app', this.temp.token);
          lstge.set('user_kuvid', this.temp.user);
          this.tokenExist = true;
          this.loading = false;
          
        }, error => {
          this.emailResend = false;
          this.authService.handleErrorRequest(error);
          this.tokenExist = false;
          this.loading = false;
        }
      )
    }

  }

  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }

  goHome() {
    this.router.navigate(['']);
  }

  async resendEmail() {
    try {
      const data = await this.authService.userResendConfirmation(lstge.get('user_kuvid').email);
      this.emailResend = false;
    } catch (error) {
      this.authService.handleErrorRequest(error);
    }
  }

}
