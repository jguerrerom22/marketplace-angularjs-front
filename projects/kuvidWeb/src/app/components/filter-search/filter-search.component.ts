import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.sass']
})
export class FilterSearchComponent implements OnInit {
  temp: any;
  prices = [];
  @Output() filterEvent = new EventEmitter<any>();

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.filtersPrice().subscribe(
      datos => {
        this.temp = datos;
        this.prices = this.temp.prices;
        //this.descuentos = this.temp.data.descuentos;
      }, error => {

      }
    )
  }

  selectPrice(id: number){

    const index = this.prices.findIndex(x => x.id === id); 
    const data = this.prices[index];
    
    if (!data.active){
      for (let y in this.prices){
        this.prices[y].active = false;
      }
      this.prices[index].active = true;
      this.filterEvent.emit({start: data.start, end: data.end});
    } else {
      this.prices[index].active = false;
      this.filterEvent.emit({start: null, end: null});
    }
  }
}
