import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VidsComponent } from './vids/vids.component';
import { VidpostComponent } from './vidpost/vidpost.component';


const routes: Routes = [
  {path: '', component: VidsComponent},
  {path: 'post/:id', component: VidpostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VidmoduleRoutingModule { }
