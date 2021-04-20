import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchingComponent } from './pages/searching/searching.component';
import { VidsPageComponent } from './pages/vids-page/vids-page.component';



const routes: Routes = [
  {path: '', component: HomeComponent, children: []},
  {path: 'search', component: SearchingComponent},
  {path: 'search/:query', component: SearchingComponent},
  {path: 'search/category/:category', component: SearchingComponent},
  {path: 'search/company/:company', component: SearchingComponent},
  {path: 'search/company/:company/:category', component: SearchingComponent},
  {
    path: 'user',
    loadChildren: () => import('./modules/loginmodule/loginmodule.module').then(m => m.LoginmoduleModule) 
  },
  {
    path: 'vid',
    loadChildren: () => import('./modules/vidmodule/vidmodule.module').then(m => m.VidmoduleModule)
  },
  {
    path: 'studio',
    loadChildren: () => import('./modules/studiomodule/studiomodule.module').then(m => m.StudiomoduleModule)
  },
  {
    path: 'commerce',
    loadChildren: () => import('./modules/commercemodule/commercemodule.module').then(m => m.CommercemoduleModule)
  },
  {
    path: 'eduvid',
    loadChildren: () => import('./modules/eduvidmodule/eduvidmodule.module').then(m => m.EduvidmoduleModule)
  },
  {
    path: 'politics',
    loadChildren: () => import('./modules/politics/politics.module').then(m => m.PoliticsModule)
  },
  {path: 'vids', component: VidsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
