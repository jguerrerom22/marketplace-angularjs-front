import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CompanyService } from '../../services/company.service';
import { ItemService } from '../../services/item.service';
import { LocalStorage as lstge } from '../../shared/local-storage.service';
import { UserlogService } from '../../shared/userlog.service';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.sass']
})
export class SearchingComponent implements OnInit, OnDestroy {
  sub: any;
  subQuery: any;
  temp: any;
  items = [];
  visual = true;
  isLoading = false;
  textSearch = '';
  filters: any;
  categoriesCompany = [];
  infoCompany: any;

  skip = 0;
  limit = 9;
  constructor(
    private companyService: CompanyService, 
    private itemService: ItemService, 
    public userlog: UserlogService, 
    private lstge: lstge, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    // Params variables
    this.route.params.subscribe(params => {

      this.filters = {};
      this.items = [];
      this.skip = 0;

      if (params['company']){
        this.filters.company = params['company'];
        this.callCompanyData();
      } 
      if (params['category']) this.filters.category = params['category'];
      if (params['query']) this.filters.query = params['query'];
      
      this.callItems();
   });
  }

  async callCompanyData() {
    try {
      this.infoCompany = await this.companyService.companyInfo(this.filters.company);
    } catch (error) {
      this.companyService.handleErrorRequest(error);
    }
  }

  async callItems() {

    try {
      this.temp = await this.itemService.itemList(this.filters, this.skip,this.limit);
      this.items = this.items.concat(this.temp);
      if (this.skip === 0) window.scrollTo({top: 0, behavior: 'smooth'});
    } catch (error) { this.itemService.handleErrorRequest(error) };
  }

  async callMoreItems() {
    this.skip = this.skip + 9;
    this.callItems();
  }

  filterPrice(data: any){
    this.filters['pricegte'] = data['start'];
    this.filters['pricelte'] = data['end'];
    this.skip = 0;
    this.items = [];
    this.callItems();
  }

  ngOnDestroy() {
    
  }

}
