import { Component, OnInit, OnChanges } from '@angular/core';

import { environment } from './../../../../environments/environment';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.sass']
})
export class LocationComponent implements OnInit {

  constructor(private stateService: StateService) { }

  tempstates = [];
  countries = [];
  states = [];
  citys = [];


  countryActive = '';
  stateActive = '';

  includes = [{id: '5ec445b37d64a43f288e75bf', name: 'Colombia',  type: 'country'}];
  excludes = [];

  ngOnInit(): void {
    this.callCountries();
  }

  async callCountries() {
    this.callDepartments();
    this.countries = [{id: '5ec445b37d64a43f288e75bf', name: 'Colombia', active: false, selected: false, type: 'country'},
                      {id: 'xxxxxxxxxxxxxxxxxxxxxxxx', name: 'Ecuador', active: false, selected: false,  type: 'country'}]
  }

  async callDepartments() {
    try {
      const data = await this.stateService.statesAll(environment.defaultCountry);  
      this.tempstates = data as any;
      this.tempstates.forEach(element => {
        this.states.push({id: element._id, name: element.name, active: false, selected: false, type: 'state'})
      })
      console.log(this.states);
    } catch (error) {
      this.stateService.handleErrorRequest(error);
    }
  }

}
