import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Internacinalización
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { OwlModule } from 'ngx-owl-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import 'hammerjs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ClickOutsideModule } from 'ng-click-outside';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { BannersComponent } from './components/banners/banners.component';
import { CategorysComponent } from './components/categorys/categorys.component';
import { SearchingComponent } from './pages/searching/searching.component';
import { FilterSearchComponent } from './components/filter-search/filter-search.component';
import { VidsPageComponent } from './pages/vids-page/vids-page.component';
import { DateFnsModule } from 'ngx-date-fns';
import { ComponentsModule } from './modules/components/components.module';
import { NgxLoadingModule } from 'ngx-loading';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('301868886527-m4sabshem1b1fnhm7ssfefl0ku0s1ij3.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('286521559203227')
  }
]);

export function provideConfig() {
  return config;
}

const CustomSelectOptions: INgxSelectOptions = {
  optionValueField: 'id',
  optionTextField: 'name',
  keepSelectedItems: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BannersComponent,
    CategorysComponent,
    SearchingComponent,
    FilterSearchComponent,
    VidsPageComponent
  ],
  imports: [
    NgxLoadingModule.forRoot({}),
    InfiniteScrollModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxSkeletonLoaderModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    ClickOutsideModule,
    OwlModule,
    ScrollingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    NgxGalleryModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    ComponentsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    DateFnsModule.forRoot(),
    DeviceDetectorModule.forRoot(),
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
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
