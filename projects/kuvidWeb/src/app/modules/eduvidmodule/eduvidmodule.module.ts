import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
import { ComponentsModule } from '../components/components.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import { EduvidmoduleRoutingModule } from './eduvidmodule-routing.module';
import { EduvidComponent } from './eduvid/eduvid.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [EduvidComponent],
  imports: [
    CommonModule,
    EduvidmoduleRoutingModule,
    InfiniteScrollModule,
    HttpClientModule,
    OwlModule,
    FormsModule,
    ComponentsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ]
})
export class EduvidmoduleModule { }
