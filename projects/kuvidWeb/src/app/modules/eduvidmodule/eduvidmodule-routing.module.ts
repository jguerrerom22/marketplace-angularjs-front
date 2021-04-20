import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EduvidComponent } from './eduvid/eduvid.component';


const routes: Routes = [
  {path: '', redirectTo: 'lessons', pathMatch: 'full'},
  {path: 'lessons', component: EduvidComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EduvidmoduleRoutingModule { }
