import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';
import { OwlModule } from 'ngx-owl-carousel';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ModalModule} from 'ngx-bootstrap/modal';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


import { StudiomoduleRoutingModule } from './studiomodule-routing.module';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ManageStoriesComponent } from './manage-stories/manage-stories.component';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { NgxLoadingModule } from 'ngx-loading';
import { CompanyFormComponent } from './company-form/company-form.component';
import { PostFormComponent } from './post-form/post-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AccountSetupComponent } from './account-setup/account-setup.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [UserSettingsComponent, ManageStoriesComponent, ManagePostComponent, ManageProductsComponent, CompanyFormComponent, PostFormComponent, ProductFormComponent, AccountSetupComponent],
  imports: [
    NgxLoadingModule.forRoot({}),
    InfiniteScrollModule,
    CommonModule,
    StudiomoduleRoutingModule,
    ComponentsModule,
    NgxDropzoneModule,
    ImageCropperModule,
    HttpClientModule,
    PickerModule,
    NgScrollbarModule,
    OwlModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ]
})
export class StudiomoduleModule { }
