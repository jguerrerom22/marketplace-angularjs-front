import { Component, OnInit, ViewChild } from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';

import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.sass']
})
export class BannersComponent implements OnInit {
  /**
   * Componente de variable temporal
   */
  temp: any;
  /**
   * Variable Banner
   */
  banners = [];
  lateralBanner = { link: '', mediaUrl: '', name: '' };
  /**
   * Trae el carrusel de owl caoursel
   */
  @ViewChild('owlElement', {static: false}) owlElement: OwlCarousel;
  constructor(private bannerService: BannerService) { }

  ngOnInit(): void {
    this.callBanners();
  }

  async callBanners() {
    try {
      const allBanners = await this.bannerService.bannersAll();
      this.banners = allBanners.filter(x => x['type'] === 'principal');
      this.lateralBanner = allBanners.filter(x => x['type'] === 'lateral')[0];
      console.log(this.lateralBanner);
      
    } catch (error) {
      this.bannerService.handleErrorRequest(error)
    }
  }

  /**
   * Ir a la diapositiva
   * @param x ir a la diapositiva correcta del carrusel
   */
  irposicion(x) {
    this.owlElement.to([x , 200]);
  }


}
