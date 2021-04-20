import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { KInputComponent } from './uiElements/k-input/k-input.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxSelectModule } from 'ngx-select-ex';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DateFnsModule } from 'ngx-date-fns';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { OwlModule } from 'ngx-owl-carousel';
import { ClickOutsideModule } from 'ng-click-outside';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { KSelectComponent } from './uiElements/k-select/k-select.component';
import { KCalendarComponent } from './uiElements/k-calendar/k-calendar.component';
import { KDateComponent } from './uiElements/k-date/k-date.component';
import { CommentsComponent } from './comments/comments.component';
import { DateFormatComponent } from './date-format/date-format.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import { Products1Component } from './products1/products1.component';
import { StorysComponent } from './storys/storys.component';
import { MenuStudioComponent } from './menu-studio/menu-studio.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { SearchPipe } from './filters/search.pipe';
import { KTextareaComponent } from './uiElements/k-textarea/k-textarea.component';
import { LocationComponent } from './location/location.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ChangeFormComponent } from './change-form/change-form.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component'
import { NgxLoadingModule } from 'ngx-loading';
 
const maskConfig: Partial<IConfig> = {
  validation: false,
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [KInputComponent, KSelectComponent, KCalendarComponent, KDateComponent, CommentsComponent, DateFormatComponent, HeaderComponent, PostComponent, Products1Component, StorysComponent, MenuStudioComponent, SelectUserComponent, SearchPipe, KTextareaComponent, LocationComponent, ChangeFormComponent, AddressFormComponent, CreditCardFormComponent],
  imports: [
    NgxLoadingModule.forRoot({}),
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    NgxSelectModule,
    NgxSkeletonLoaderModule,
    ClickOutsideModule,
    OwlModule,
    ScrollingModule,
    DateFnsModule.forRoot(),
    TooltipModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
    BsDatepickerModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [CreditCardFormComponent, AddressFormComponent, ChangeFormComponent, KInputComponent, KSelectComponent, KCalendarComponent, KDateComponent, HeaderComponent, CommentsComponent, DateFormatComponent, PostComponent, Products1Component, StorysComponent, MenuStudioComponent, SelectUserComponent, SearchPipe, KTextareaComponent, LocationComponent]
})
export class ComponentsModule { }
