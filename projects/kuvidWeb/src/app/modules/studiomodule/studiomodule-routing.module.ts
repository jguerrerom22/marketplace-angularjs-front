import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ManageStoriesComponent } from './manage-stories/manage-stories.component';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { AccountSetupComponent } from './account-setup/account-setup.component';


const routes: Routes = [
  {path: '', redirectTo: 'userSettings', pathMatch: 'full' },
  {path: 'userSettings', component: UserSettingsComponent },
  {path: 'manageStories', component: ManageStoriesComponent},
  {path: 'managePosts', component: ManagePostComponent},
  {path: 'accountSetup', component: AccountSetupComponent},
  {path: 'manageItems/:itemType', component: ManageProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudiomoduleRoutingModule { }
