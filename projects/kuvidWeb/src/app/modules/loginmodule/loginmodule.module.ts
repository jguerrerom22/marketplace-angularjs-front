import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginmoduleRoutingModule } from './loginmodule-routing.module';
import { LoginComponent } from './login/login.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RecaptchaModule} from 'ng-recaptcha';
import { NgxSelectModule } from 'ngx-select-ex';
import { ComponentsModule } from '../components/components.module';
import { RegisterComponent } from './register/register.component';
import { RegisterBusinessComponent } from './register-business/register-business.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [LoginComponent, RegisterComponent, RegisterBusinessComponent, ResetPasswordComponent, ConfirmationComponent],
  imports: [
    ComponentsModule,
    HttpClientModule,
    FormsModule,
    NgxSelectModule,
    RecaptchaModule,
    CommonModule,
    LoginmoduleRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
  
  ],
})
export class LoginmoduleModule { }
