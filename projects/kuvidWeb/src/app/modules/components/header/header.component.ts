import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import { environment } from './../../../../../src/environments/environment';
import { UserlogService } from '../../../shared/userlog.service';
import { UserService } from '../../../services/user.service';
import { StateService } from '../../../services/state.service';
import { CityService } from '../../../services/city.service';
import { LocalStorage as lstge } from './../../../shared/local-storage.service';
import { CartService } from './../../../shared/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  activeSearch = false;
  /**
   * Activa el menu del usuario
   */
  userMenuActive = false;
  cartMenuActive = false;
  notifications = [{tittleNoti: '', description: ''}];
  shoppingCartLength = 0;
  //shoppingCart: any;
  userLoged = false;
  user: any;
  activedAccount: any;

  changeAccount = false;

  states = [];
  cities = [];


  constructor(
    private userService : UserService,
    public router: Router, 
    public userlog: UserlogService, 
    private modalService: BsModalService,
    private cartService : CartService,
    private stateService : StateService,
    private cityService : CityService
  ) { 

    this.cartService.cart$.subscribe(items => {
      this.shoppingCartLength = items.length
    });
    
    this.activedAccount = lstge.get('actived_account');
  }

  modalRef: BsModalRef;
  @ViewChild('selectCity') modal: TemplateRef<any>;
  modalConfig = {
    class: 'modal-lg modal-dialog-centered',
    keyboard: true,
    ignoreBackdropClick: true
  };
  smallModalConfig = {
    class: 'modal-sm modal-dialog-centered',
    keyboard: true,
  }

  ngOnInit(): void {
    this.getItemsCart();
    this.getStates();
    this.user = lstge.get('user_kuvid');
  }

  // cartMenuClick(){
  //   this.cartMenuActive = !this.cartMenuActive;
  //   this.userMenuActive = false;
  // }

  userMenuClick(){
    this.userMenuActive = !this.userMenuActive;
    this.cartMenuActive = false;
  }

  async getItemsCart(){
    try {
      if (lstge.get('cart')){
        const cartItems = lstge.get('cart');
        this.cartService.addCart(cartItems);
        this.shoppingCartLength = cartItems.length;

      } else {

        const data = await this.userService.userShoppingCart();
        this.shoppingCartLength = data.length;
        this.cartService.addCart(data.map(x => x['item']['_id']));
      }
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  goToSearch(event) {
    const text = event.target.value;
    if (text) this.router.navigate(['search', text]);
  }

  logout() {
    lstge.delete('user_kuvid');
    lstge.delete('token_app');
    lstge.delete('cart');
    location.reload();
  }


  openModal() {
    this.modalRef = this.modalService.show(this.modal, this.smallModalConfig);
  }

  
  selectCity(e) {
    console.log(e);
    this.modalRef.hide();
    /* this.state = undefined;
    this.city = undefined; */
  }

  setActivedCompany(company: any) {
    this.userlog.setActivedAccount(company, 'company');
  }

  setActivedUser() {
    this.userlog.setActivedAccount(this.user, 'user');
  }

  goToMyCurrentAccount() {
    const activedAccount = lstge.get('actived_account');
    if (activedAccount.is === 'company') {
      this.router.navigate(['commerce/shop', activedAccount.id]);
    }
  }

  async getStates(){
    try {
      this.states = this.states.concat(await this.stateService.statesAll(environment.defaultCountry));
    } catch (error) {
      this.stateService.handleErrorRequest(error);
    }
  }

  async loadCities(state: string) {
    try {
      this.cities = this.cities.concat(await this.cityService.citiesAllByState(state));
    } catch (error) {
      this.stateService.handleErrorRequest(error);
    }
  }
}
