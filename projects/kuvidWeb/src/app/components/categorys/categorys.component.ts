import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.sass']
})
export class CategorysComponent implements OnInit {

  @Input() company = '';

  products = [];
  services = [];
  temp: any;
  constructor(private categoryService: CategoryService, private router: Router) { }

  async ngOnInit() {

    try {

      if (this.company && this.company !== ''){
        // Categories of the company
        const dataCateg = await this.categoryService.categoriesCompany(this.company);
        this.temp = dataCateg;
        const categories = this.temp;
        
        if (categories.length > 0) {
          
          const products = categories.find(x => x.type === 'product'); 
          if (products){
            this.products = this.products.concat(products);
          }

          const services = categories.find(x => x.type === 'service');
          if (services){
            this.services = this.services.concat(services);
          }
        }

      } else {
        
        const dataProduct = await this.categoryService.productCategoriesAll();
        this.temp = dataProduct;
        this.products = this.temp; 

        const dataService = await this.categoryService.serviceCategoriesAll();  
        this.temp = dataService;
        this.services = this.temp;
      }
       
    } catch (error) {
      this.categoryService.handleErrorRequest(error)
    }
  }

  selectCategory(category: string) {

    if (this.router.url.includes('/search/company/')){
      this.router.navigate(['/search/company', this.company, category]);
    } else {
      this.router.navigate(['/search/category/', category]);
    }
  }
}
