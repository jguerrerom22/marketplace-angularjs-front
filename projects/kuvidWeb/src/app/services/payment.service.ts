import { Injectable } from '@angular/core';
import { BaseService } from './base.service'

import { environment } from './../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class PaymentService extends BaseService {

  /**
   * Getting all the payment method
   */
  paymentMethods(): object[] {
    return [
        {id: '1', name: 'pse', text: 'paybank', urlIcon: 'https://i.pinimg.com/564x/cc/e9/94/cce994ef6d2d90a701fd352a937590ea.jpg', active: false},
        {id: '2', name: 'credit', text: 'payCard', urlIcon: 'https://image.flaticon.com/icons/svg/138/138287.svg', active: false},
        {id: '3', name: 'efecty', text: 'Efecty', urlIcon: 'assets/images/efectyLogo.png', active: false},
        {id: '4', name: 'baloto', text: 'Baloto', urlIcon: 'assets/images/balotoLogo.png', active: false},
        {id: '5', name: 'gana', text: 'Gana', urlIcon: 'assets/images/ganalogo.png', active: false},
        {id: '6', name: 'redServy', text: 'Red servy', urlIcon: 'assets/images/redServiLogo.png', active: false},
        {id: '7', name: 'puntoRed', text: 'Punto Red', urlIcon: 'assets/images/puntoredLogo.png', active: false}
    ];
  }

  /**
   * Get credit cards of the user
   * @param data Info of credit card
   */
   async banks() {
    const url = 'shop/payment/banks';
    return await this.http.get<object[]>(environment.apiUrl + url, await this.getHttpRequestOptions()).toPromise()
  }

  /**
   * Create an order
   * @param data Info of checkout
   */
   async checkout(data: object) {
    const url = 'shop/payment/checkout';
    return await this.http.post<object>(environment.apiUrl + url, data, await this.getHttpRequestOptions()).toPromise()
  }
}