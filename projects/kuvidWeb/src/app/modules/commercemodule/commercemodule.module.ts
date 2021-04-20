import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { OwlModule } from 'ngx-owl-carousel';
import { GalleryModule } from  '@ngx-gallery/core';
import { CommercemoduleRoutingModule } from './commercemodule-routing.module';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ShopComponent } from './shop/shop.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgxLoadingModule } from 'ngx-loading';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [ProductComponent, ShoppingCartComponent, ShopComponent],
  imports: [
    NgxLoadingModule.forRoot({}),
    CommonModule,
    CommercemoduleRoutingModule,
    InfiniteScrollModule,
    ComponentsModule,
    OwlModule,
    NgScrollbarModule,
    //NgxGalleryModule,
    GalleryModule,
    NgxMaskModule.forRoot(maskConfig),
    HttpClientModule,
    FormsModule,
    NgxStarRatingModule,
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
export class CommercemoduleModule { }
