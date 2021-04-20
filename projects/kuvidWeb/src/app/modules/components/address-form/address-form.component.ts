import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { environment } from './../../../../../src/environments/environment';
import { StateService } from '../../../services/state.service';
import { CityService } from '../../../services/city.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.sass']
})
export class AddressFormComponent implements OnInit {
  @Input() initialShippingData: any;
  @Output() close = new EventEmitter();

  public loading = false;

  formShipping = {
    id: null,
    name: '', 
    phoneNumber: '', 
    state: '', 
    city: '', 
    address: '',
    neighborhood: '', 
    notes: ''
  };
  
  states = [];
  cities = [];

  fieldsValidation = {
    name: false, 
    phoneNumber: false, 
    state: false, 
    city: false, 
    address: false,
    neighborhood: false
  }

  constructor(
    private stateService: StateService,
    private cityService: CityService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.initialShippingData){
      this.formShipping = this.initialShippingData;
    }

    this.callStates();
    if (this.formShipping.id !== null) this.loadCities(this.formShipping.state);
  }

  async callStates() {
    try {
      this.states = await this.stateService.statesAll(environment.defaultCountry);
    } catch (error) {
      this.stateService.handleErrorRequest(error);
    }
  }
  
  async loadCities(state: string) {
    try {
      this.cities = await this.cityService.citiesAllByState(state);
    } catch (error) {
      this.stateService.handleErrorRequest(error);
    }
  }

  async saveShipping() {

    if (!this.validateForm()) return;

    try {
      this.loading = true;
      const id = this.formShipping.id;

      delete this.formShipping.state;
      delete this.formShipping.id;
      if (this.formShipping.notes === '') delete this.formShipping.notes;

      let shippingList;
      if (id !== null){
        shippingList = await this.userService.userShippingUpdate(id, this.formShipping);
      } else {
        shippingList = await this.userService.userShippingCreate(this.formShipping);
      }
      
      this.loading = false;
      this.close.emit(shippingList);
    } catch (error) {
      this.loading = false;
      this.userService.handleErrorRequest(error);
    }
  }

  validateForm(): Boolean {
    let isOk = true;

    Object.entries(this.fieldsValidation).map(x => {
      if (this.formShipping[x[0]] === ''){
        this.fieldsValidation[x[0]] = true;
        isOk = false;
      } else {
        this.fieldsValidation[x[0]] = false;
      }
    })
    return isOk;
  }

  closeModal() {
    this.close.emit(null);
  }

}
