import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { UserlogService } from '../../../shared/userlog.service';
import { UserService } from '../../../services/user.service';
import { PaymentService } from '../../../services/payment.service';
import { UtilService } from '../../../services/util.service';

import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {

  public loading = false;

  modalRef: BsModalRef;
  @ViewChild('addressForm') modal: TemplateRef<any>;
  @ViewChild('paymentModal') modalPayment: TemplateRef<any>;
  modalConfig = {
    class: 'modal-xl modal-dialog-centered',
    keyboard: true,
    ignoreBackdropClick: true
  };

  temp: any;
  userInfo: any
  shoppingCart: any;
  totalOrder: number;
  paymentMethods = [];

  paymentMethodSelected = { 
    id: null, 
    text: null, 
    urlIcon: '' 
  };
  paymentMethodSelectedToShow = { 
    icon: '', 
    text: '', 
    description: '' 
  };
  shippingSelected = { _id: null };

  errorsForm = {
    pse: false,
    creditCard: false,
    paymentMethod: false
  };
  errorRegistrationCreditCard = false;

  pseData = { 
    name: '', 
    docType: '', 
    document: '', 
    personType: '', 
    bank: '' 
  };

  quantities = [
    {id: 1, name: 1}, 
    {id: 2, name: 2}, 
    {id: 3, name: 3}, 
    {id: 4, name: 4}, 
    {id: 5, name: 5}, 
    {id: 6, name: 6}, 
    {id: 7, name: 7}, 
    {id: 8, name: 8}, 
    {id: 9, name: 9}, 
    {id: 10, name: 10}, 
    {id: 11, name: 11}, 
    {id: 12, name: 12}, 
    {id: 13, name: 13}, 
    {id: 14, name: 14}, 
    {id: 999, name: 'Otro'}
  ];
  quantity = 1;

  creditCards = [
    {id: '1', type: 'Master Card', number: '2341'},
    {id: '2', type: 'Visa', number: '4578'}
  ]

  creditCardData = {
    id: '',
    name: '',
    number: '',
    month: '',
    year: '',
    cvc: '',
    saveCard: false
  }

  personType = [];
  documentTypes = [];
  banks = [];

  months = [];
  years = []

  constructor(
    public userlog: UserlogService,
    private userService: UserService,
    private paymentService: PaymentService,
    private modalService: BsModalService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.loadInit();
  }

  async loadInit() {
    await this.callMyInfo();
    await this.callShoppingCart();

    await this.callBanks();
    this.paymentMethods = this.paymentService.paymentMethods();
    this.documentTypes = this.utilService.documentTypes();
    this.personType = this.utilService.personType();
    this.loadPSEInfo();
    this.loadMonths();
    this.loadYears();
  }

  async callMyInfo(){
    try {
      const data = await this.userService.userMyInfo();
      this.userInfo = data;
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  async callShoppingCart() {
    try {
      const data = await this.userService.userShoppingCartByCompany();
      this.shoppingCart = data;
      this.setTotalOrder();
      
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  async callBanks() {
    try {
      const data = await this.paymentService.banks();
      this.banks = data.map(x => ({ id: x['id'], name: x['value'] }));
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  loadPSEInfo() {
    this.pseData.name = `${this.userInfo.firstName} ${this.userInfo.lastName}`;

    this.pseData = {
      name: `${this.userInfo.firstName} ${this.userInfo.lastName}` || '',
      docType: this.userInfo.additional.documentType || '',
      document: this.userInfo.additional.document || '',
      bank: this.userInfo.additional.bankId || '',
      personType: this.userInfo.additional.personType || '',
    };
    
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

  setTotalOrder(){
    var total = 0;
    this.shoppingCart.map(x => {
      x.items.map(y => (total += y.total));
    });
    this.totalOrder = total;
  }

  openShippingForm(){
    this.modalRef = this.modalService.show(this.modal, this.modalConfig);

  }

  async removeShipping(id: string){
    try {
      const data = await this.userService.userShippingRemove(id);
      if (data && data['status'] === 'success'){
        this.callMyInfo();
        if (this.shippingSelected._id === id){
          this.shippingSelected = { _id: null };
        }
      } 
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  async removeItem(id: string){
    try {
      const data = await this.userService.userCartRemoveItem(id);
      if (data){
        this.callShoppingCart();
        //const index = this.shoppingCart.findIndex(x => x._id === id);
        //this.shoppingCart.splice(index,1);
        //this.setTotalOrder();
      }
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  async updateQuantity(id: string, quantity: number){
    
    try {
      const data = await this.userService.userCartUpdateItem(id, { quantity });
      if (data && data['status'] === 'success'){
        this.callShoppingCart();
      } 
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  closeModal() {
    this.modalRef.hide();
  }

  openPaymentForm() {
    this.modalRef = this.modalService.show(this.modalPayment, this.modalConfig);
  }


  async selectPaymentMethod() {
    if (this.validatePaymentMethodSelection() === false) return;

    this.paymentMethodSelectedToShow.description = '';

    if(this.paymentMethodSelected['id'] === '1') {
      this.paymentMethodSelectedToShow.description = ': ' + this.banks.find(x => x.id === this.pseData.bank)['name'] ;
    } else if(this.paymentMethodSelected['id'] === '2') {

      if (this.creditCardData.saveCard === true){
        const resCreation = await this.saveCreditCard();
        if (!resCreation) return;
      }
      this.creditCardData.id = '';
      this.paymentMethodSelectedToShow.description = '****' + this.creditCardData.number.substring(this.creditCardData.number.length-4, this.creditCardData.number.length);
    }

    this.paymentMethodSelectedToShow.icon = this.paymentMethodSelected['urlIcon'];
    this.paymentMethodSelectedToShow.text = this.paymentMethodSelected['text'];

    this.modalRef.hide();
  }

  validatePaymentMethodSelection() {
    let isValid = true;
    this.errorsForm = {
      pse: false,
      creditCard: false,
      paymentMethod: false
    }
    if (this.paymentMethodSelected['id'] === '1'){

      if (this.pseData.docType === '' || 
          this.pseData.document === '' ||
          this.pseData.name === '' ||
          this.pseData.personType === '' ||
          this.pseData.bank === ''){
            this.errorsForm.pse = true;
            isValid = false;
      }
    } else if (this.paymentMethodSelected['id'] === '2'){
      if (this.creditCardData.name === '' ||
          this.creditCardData.number === '' ||
          this.creditCardData.month === '' ||
          this.creditCardData.year === '' ||
          this.creditCardData.cvc === '') {
            this.errorsForm.pse = true;
            isValid = false;
      }
    }

    return isValid;
  }

  endModalAddress(shippingList) {
    if (shippingList !== null){
      this.userInfo.shipping = shippingList;
    }
    this.modalRef.hide();
  }

  async deleteCreditCard(id) {
    try {
      this.loading = true;
      const r = await this.userService.userCreditCardRemove(id);
      this.loading = false;
      if (r['status'] === 'success'){
        const index = this.userInfo.creditCards.findIndex(x => x._id === id);
        this.userInfo.creditCards.splice(index,1);

        if (id === this.creditCardData.id){
          this.paymentMethodSelectedToShow = {icon: '', text: '', description: '' };
          this.creditCardData.id = '';
        }
      }
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  selectCreditCard(id, mask) {
    this.creditCardData.id = id;
    this.paymentMethodSelectedToShow.icon = this.paymentMethodSelected['urlIcon'];
    this.paymentMethodSelectedToShow.text = this.paymentMethodSelected['text'];
    this.paymentMethodSelectedToShow.description = ' ****' + mask.substring(mask.length-4, mask.length);
    this.modalRef.hide();
  }

  async saveCreditCard() {
    try {
      this.loading = true;
      this.errorRegistrationCreditCard = false;
      const creditCardResult = await this.userService.userCreditCardCreate({
        name: this.creditCardData.name,
        number: this.creditCardData.number,
        expMonth: this.creditCardData.month,
        expYear: this.creditCardData.year,
        cvc: this.creditCardData.cvc
      });
      this.userInfo.creditCards = creditCardResult;
      this.loading = false;
      return true;

    } catch (error) {
      this.loading = false;
      if (error.status === 400){
        this.errorRegistrationCreditCard = true;
      }
      this.userService.handleErrorRequest(error);
      return false;
    }
  }

  async checkout() {
    if (this.paymentMethodSelected.id === '' || this.paymentMethodSelected.id === null){
      this.errorsForm.paymentMethod = true;
      return;
    }

    const data = {
      method: this.paymentMethodSelected,
      pse: this.pseData,
      creditCard: {
        id: this.creditCardData.id,
        name: this.creditCardData.name,
        number: this.creditCardData.number,
        expMonth: this.creditCardData.month,
        expYear: this.creditCardData.year,
        cvc:  this.creditCardData.cvc
      }
    };
    
    try {
      const resp = await this.paymentService.checkout(data);
      console.log(resp);
      
    } catch (error) {
      this.paymentService.handleErrorRequest(error);
    }
    
  }
}
