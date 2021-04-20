import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { CityService } from './../../../services/city.service';
import { CompanyService } from './../../../services/company.service';
import { environment } from './../../../../../src/environments/environment';
import { UserlogService } from './../../../shared/userlog.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.sass']
})
export class CompanyFormComponent implements OnInit {

  @Input() company = {
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
  };;

  @Output() endEdition = new EventEmitter<any>();

  errorGeneral = false;
  errors = {
    name: false,
    description: false,
    address: false,
    city: false,
    phone: false,
    email: false,
    logo: false,
    cover: false
  };

  steps = 1;
  imageChangedEvent = undefined;
  imageChangedType = 'logo';
  imageChangedRatio = 0;
  imageChangedRatioCover = 6/3;
  imageChangedRatioLogo = 1/1;

  cities = [];
  
  public loading = false;

  selectedValue: string;
  selectedOption: any;
  
  onSelect(event: TypeaheadMatch): void {
    this.company.selectedOption = event.item;
    this.company.city = event.item._id;
  }

  constructor(
    private cityService: CityService,
    private companyService: CompanyService,
    private userlog: UserlogService
  ) {
  }

  ngOnInit(): void {
    this.callDepartments();
  }

  async callDepartments() {
    try {
      const data = await this.cityService.citiesAll(environment.defaultCountry);  
      this.cities = data as any;
    } catch (error) {
      this.cityService.handleErrorRequest(error);
    }
  }

  async createCompany() {
    this.loading = true;

    if (this.company.slogan === '') this.company.slogan = undefined;

    const formData = new FormData();
    formData.append('name', this.company.name);
    formData.append('slogan', this.company.slogan);
    formData.append('description', this.company.description);
    formData.append('address', this.company.address);
    formData.append('city', this.company.city);
    formData.append('phone', this.company.phone);
    formData.append('email', this.company.email);

    try {
      if (this.company.id){

        // Company update
        await this.companyService.companyUpdate(this.company.id, {
          name: this.company.name,
          slogan: this.company.slogan,
          description: this.company.description,
          address: this.company.address,
          city: this.company.city,
          phone: this.company.phone,
          email: this.company.email
        });
        
        // Logo update
        if (!this.userlog.isValidURL(this.company.logo)){
          const fileLogo = this.userlog.base64ToFile(this.company.logo, 'logo.png');
          const formDataLogo = new FormData();
          formDataLogo.append('logo', fileLogo)
          await this.companyService.companyUpdateLogo(this.company.id, formDataLogo);
        }
        
        // Cover picture update
        if (this.company.cover && !this.userlog.isValidURL(this.company.cover)){
          const formDataCover = new FormData();
          formDataCover.append('cover', this.userlog.base64ToFile(this.company.cover,'cover.png'));
          await this.companyService.companyUpdateCoverPicture(this.company.id, formDataCover);
        }

      } else {

        // New company
        const fileLogo = this.userlog.base64ToFile(this.company.logo, 'logo.png');
        formData.append('logo', fileLogo);
        if (this.company.cover){
          formData.append('cover', this.userlog.base64ToFile(this.company.cover,'cover.png'));
        }
        await this.companyService.companyCreate(formData);
      }
      
      this.endEdition.emit(this.company);
      this.loading = false;

    } catch (error) {
      this.loading = false;
      this.errorGeneral = true;
      this.companyService.handleErrorRequest(error);
    }
  }

  changeImageFile(type: string, file: object) {
    this.imageChangedEvent = file[0];
    this.company[type] = file;
    this.imageChangedType = type;
    this.imageChangedRatio = (type === 'cover') ? this.imageChangedRatioCover : this.imageChangedRatioLogo;
    this.steps = 100;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.company[this.imageChangedType] = event.base64;
  }

  changeStep(step: number){
    let error = false;
    if (step === 2){
      this.errors.name = this.errors.description = false;
      if (this.company.name === '') { this.errors.name = true; error = true; }
      if (this.company.description === '') { this.errors.description = true; ; error = true; }
      if (!error) this.steps = step;
    } else if (step === 3){
      this.errors.city = this.errors.address = this.errors.phone = this.errors.email = false;
      if (this.company.city === '') { this.errors.city = true; error = true; }
      if (this.company.address === '') { this.errors.address = true; ; error = true; }
      if (this.company.phone.length < 10) { this.errors.phone = true; ; error = true; }
      if (!this.userlog.emailIsValid(this.company.email)) { this.errors.email = true; ; error = true; }
      if (!error) this.steps = step;
    } else if (step === 0){
      this.errors.logo = false;
      if (!this.company.logo) { this.errors.logo = true; error = true; }
      if (!error) this.createCompany();
    }
  }

  closeModal(){
    this.endEdition.emit(null);
  }
}
