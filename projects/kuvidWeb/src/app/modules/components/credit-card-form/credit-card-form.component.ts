import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.sass']
})
export class CreditCardFormComponent implements OnInit {
  @Output() close = new EventEmitter()

  public loading = false;

  creditCardData = {
    name: '',
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  }

  fieldsValidation = {
    name: false, 
    number: false, 
    expMonth: false, 
    expYear: false, 
    cvc: false
  }

  months = [];
  years = [];

  errorRegistration = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadMonths();
    this.loadYears();
  }

  loadMonths() {
    for (let i = 1; i<=12; i++)
      this.months.push(i<10 ? '0'+i : i);
  }

  loadYears() {
    const currentYear = new Date().getFullYear();
    const limitYear = currentYear + 15;
    for (let i=currentYear; i<= limitYear; i++)
      this.years.push(i);
  }

  async saveCreditCard() {
    if (!this.validateForm()) return;

    try {
      this.loading = true;
      this.errorRegistration = false;

      const creditCardResult = await this.userService.userCreditCardCreate(this.creditCardData);
      this.loading = false;
      this.close.emit(creditCardResult);
    } catch (error) {
      this.loading = false;
      if (error.status === 400){
        this.errorRegistration = true;
      }
      this.userService.handleErrorRequest(error);
    }
  }

  validateForm(): Boolean {
    let isOk = true;

    Object.entries(this.fieldsValidation).map(x => {
      if (this.creditCardData[x[0]] === ''){
        this.fieldsValidation[x[0]] = true;
        isOk = false;
      } else {
        this.fieldsValidation[x[0]] = false;
      }
    })
    return isOk;
  }

  closeModal() {
    this.close.emit();
  }

}
