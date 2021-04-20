import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { VidmoduleRoutingModule } from './vidmodule-routing.module';
import { VidsComponent } from './vids/vids.component';
import { VidpostComponent } from './vidpost/vidpost.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [VidsComponent, VidpostComponent],
  imports: [
    InfiniteScrollModule,
    CommonModule,
    VidmoduleRoutingModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule,
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
export class VidmoduleModule { }
