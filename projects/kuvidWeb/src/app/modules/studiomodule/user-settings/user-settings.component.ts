import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal'

import { UserService } from '../../../services/user.service';
import { UserlogService } from '../../../shared/userlog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.sass']
})
export class UserSettingsComponent implements OnInit {

  activeAddColor = false;
  search = '';
  carousel = true;
  companiesList = [];
  companiesListActive = false;
  @ViewChild('companies') owlElement: OwlCarousel;
  modalConfig = {
    class: 'modal-lg modal-dialog-centered',
    keyboard: true,
    ignoreBackdropClick: true
  };

  company = {
    id: undefined,
    name: '',
    slogan: '',
    description: '',
    address: '',
    long: undefined,
    lat: undefined,
    city: '',
    phone: '',
    email: '',
    logo: undefined,
    cover: undefined,

    selectedValue: '',
    selectedOption: {}
  };

  modalRef: BsModalRef;
  @ViewChild('formCompany', { static: false }) modal: TemplateRef<any>;
  
  constructor(
    public userlog: UserlogService, 
    private modalService: BsModalService, 
    private userService: UserService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.callMyCompanies();
  }

  scrolltoleft() {
    this.owlElement.previous([200]);
  }

  scrolltoright() {
    this.owlElement.next([200]);
  }

  updateCarousel() {
    this.carousel = false;
    setTimeout(() => {
      this.carousel = true;
    }, 1);
  }

  showEditForm() {
    this.company = { id: undefined, name: '', slogan: '', description: '', address: '', long: undefined, lat: undefined, city: '', phone: '', email: '', logo: undefined, cover: undefined, selectedValue: '', selectedOption: {} };
    this.openCompanyForm();
  }

  openCompanyForm(){
    this.modalRef = this.modalService.show(this.modal, this.modalConfig);
  }

  async callMyCompanies() {
    try {
      const data = await this.userService.userMyCompanies();  
      this.companiesList = data as any;
      this.companiesListActive = false;
      setTimeout(() => this.companiesListActive = true, 1);
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  openCompanyEdit(company: any){
    
    this.company.id = company._id;
    this.company.name = company.name;
    this.company.slogan = company.slogan;
    this.company.description = company.description;
    this.company.city = company.location.city._id;
    this.company.address = company.location.address;
    this.company.phone = company.contact.phone;
    this.company.email = company.contact.email;
    this.company.logo = company.logo[1].url;
    
    this.company.cover = (company.coverPicture && company.coverPicture.length > 0) ? company.coverPicture[1].url : undefined;

    this.company.selectedValue = company.location.city.name;
    this.company.selectedOption = company.location.city;

    this.openCompanyForm();
  }

  endCompanyForm(data) {
    if (data !== null) this.callMyCompanies();
    this.modalRef.hide();
  }
}
