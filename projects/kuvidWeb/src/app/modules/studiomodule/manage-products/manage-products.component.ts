import { Component, OnInit,  ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import { ItemService } from './../../../services/item.service';
import { LocalStorage as lstge } from './../../../shared/local-storage.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.sass']
})
export class ManageProductsComponent implements OnInit {
  
  modalRef: BsModalRef;
  @ViewChild('formProducts') modal: TemplateRef<any>;
  modalConfig = {
    class: 'modal-xl modal-dialog-centered',
    keyboard: true,
    ignoreBackdropClick: true
  };

  search = '';
  activeAddColor = false;

  activedAccount: any;
  itemType: string;
  items: [];
  itemEditing: string;
  titlePage: string;

  constructor(
    private itemService: ItemService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute, 
    private location: Location
  ) { 
    this.activatedRoute.params.subscribe(params => {
      this.itemType = params['itemType'];
      if (this.itemType !== 'services' && this.itemType !== 'products'){
        this.location.back();
      } else {
        this.activedAccount = lstge.get('actived_account');
        this.loadItems();
      }
   });
  }

  ngOnInit(): void { }

  async loadItems() {
    if (this.activedAccount && this.activedAccount.is === 'company'){
      try {
        const type = (this.itemType === 'services') ? 'service' : 'product';
        this.items = await this.itemService.itemsAndCategories({ company: this.activedAccount.id, type });
        console.log(this.items);
        
      } catch (error) {
        this.itemService.handleErrorRequest(error);
      }
    }
  }

  openModal(id: string = undefined) {
    this.itemEditing = id;
    this.modalRef = this.modalService.show(this.modal, this.modalConfig);
  }

  closeModal(data: any) {
    if (data !== null) this.loadItems();
    this.modalRef.hide();
    this.itemEditing = undefined;
  }
}
