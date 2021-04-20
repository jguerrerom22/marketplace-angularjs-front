import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-products1',
  templateUrl: './products1.component.html',
  styleUrls: ['./products1.component.sass']
})
export class Products1Component implements OnInit {

  @Input() companie = '';
  @Input() products = [];
  @Input() numberItems = 2;
  @Input() fourItems = false;
  @Input() typeCategory = false;
  @ViewChild('productos') owlElement: OwlCarousel;
  constructor() { }

  ngOnInit(): void {
    
  }

  scrolltoleft() {
    this.owlElement.previous([200]);
  }

  scrolltoright() {
    this.owlElement.next([200]);
  }


  currencyFormatter(params) {
    return '$ ' + this.formatNumber(params);
  }

  formatNumber(numbery) {
    return Math.floor(numbery)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

}
