import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterBusinessComponent } from './register-business/register-business.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';




const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'registerBusiness', component: RegisterBusinessComponent},
  {path: 'resetPassword/:id', component: ResetPasswordComponent},
  {path: 'confirmation/:id', component: ConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginmoduleRoutingModule { }
