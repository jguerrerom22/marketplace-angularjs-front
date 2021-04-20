import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { UserService } from '../../../services/user.service';
import { UserlogService } from '../../../shared/userlog.service';
import { LocalStorage as lstge } from '../../../shared/local-storage.service';

@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrls: ['./account-setup.component.sass']
})
export class AccountSetupComponent implements OnInit {
  modalConfig = {
    class: 'modal-sm modal-dialog-centered',
    keyboard: true,
    ignoreBackdropClick: true
  };

  modalConfig2 = {
    class: ' modal-dialog-centered',
    keyboard: true,
    ignoreBackdropClick: true
  };

  public loading = false;

  selected = 1;
  emptyFields = false;
  passwordEqual = true;
  dataAccount : any;
  dataAccountEdition = [];
  shipping = [];
  creditCards = [];
  profilePicture: any = '';
  repeatPassword = '';
  errorPassword = false;
  canSave = false;
  shippingDataEdition = null;
 
  imageChangedEvent = undefined;
  imageChangedRatio = 0;
  imageChangedRatioLogo = 1/1;
  imageChangedType = 'logo';

  dataModalChange = {idUser: '', typeData: ''};

  modalRef: BsModalRef;
  @ViewChild('Change') modalChange: TemplateRef<any>;
  @ViewChild('addressForm') modalAddress: TemplateRef<any>;
  @ViewChild('creditCardForm') modalCrediCard: TemplateRef<any>;
  @ViewChild('imageCropper') modalImageCropper: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    public userlog : UserlogService
  ) { }

  ngOnInit() {
    this.loadInfoUser();
    this.loadUserCreditCards();
  }

  async loadInfoUser() {
    try {
      const d = await this.userService.userMyInfo();
      this.dataAccount = {
        firstName: d['firstName'],
        lastName: d['lastName'],
        password: '',
        email: d['access']['email'],
        phoneNumber: d['contact']['phoneNumber'] ?? ''
      };
      this.profilePicture = d['profilePicture'];
      this.shipping = d['shipping'];
      this.repeatPassword = '';
      
      this.dataAccountEdition = Object.entries(this.dataAccount).map(x => ({type: x[0], content: x[1], edit: false}));
      
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  async loadUserCreditCards() {
    try {
      this.creditCards = await this.userService.userCreditCard();
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  openChangeForm() {
    this.emptyFields = false;
    this.passwordEqual = true;
    Object.entries(this.dataAccountEdition).map(x => {
      const y = x[1];
      if (y['type'] === 'password' && y['edit'] === true){
        if (y['content'] === '' || this.repeatPassword === '') {
          this.emptyFields = true;
          return;
        }
        if (y['content'] !== this.repeatPassword) {
          this.passwordEqual = false;
          return;
        }
      } else {
        if (y['edit'] === true && y['content'] === ''){
          this.emptyFields = true;
          return;
        }
      }
    });

    if (this.emptyFields === false && this.passwordEqual === true){
      this.errorPassword = false;
      this.modalRef = this.modalService.show(this.modalChange, this.modalConfig);
    }
  }

  async saveAll(password) {
    this.errorPassword = false;

    let data = { validation: password };
    Object.entries(this.dataAccountEdition).map(x => {
      const y = x[1];
      if (y['edit'] === true) data[y['type']] = y['content'];
    });
    
    try {
      this.loading = true;
      await this.userService.userUpdate(data); 
      await this.loadInfoUser();
      this.loading = false;
      this.modalRef.hide();
    } catch (error) {
      this.errorPassword = true;
      this.loading = false;
    }
  }

  cancel() {
    this.dataAccountEdition.map(x => (x.edit = false));
    this.repeatPassword = '';
    this.emptyFields = false;
    this.passwordEqual = true;
    this.canSave = false;
  }


  openAddressForm(dataShipping = null) {
    if (dataShipping !== null){
      this.shippingDataEdition = {
        id: dataShipping._id,
        name: dataShipping.name, 
        phoneNumber: dataShipping.phoneNumber, 
        state: dataShipping.city.stateId, 
        city: dataShipping.city._id, 
        address: dataShipping.address,
        neighborhood: dataShipping.neighborhood,
        notes: dataShipping.notes
      };
    } else {
      this.shippingDataEdition = undefined;
    }
    this.modalRef = this.modalService.show(this.modalAddress, {
      class: 'modal-lg modal-dialog-centered',
      keyboard: true,
      ignoreBackdropClick: true
    });
  }

  async deleteAddress(id) {
    try {
      const r = await this.userService.userShippingRemove(id);
      if (r['status'] === 'success'){
        const index = this.shipping.findIndex(x => x._id === id);
        this.shipping.splice(index,1);
      }
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  async deleteCreditCard(id) {
    try {
      const r = await this.userService.userCreditCardRemove(id);
      if (r['status'] === 'success'){
        const index = this.creditCards.findIndex(x => x._id === id);
        this.creditCards.splice(index,1);
      }
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  openCreditCardForm() {
    this.modalRef = this.modalService.show(this.modalCrediCard, {
      class: 'modal-lg modal-dialog-centered',
      keyboard: true,
      ignoreBackdropClick: true
    });
  }

  changeImageFile(type: string, file: object) {
    this.imageChangedEvent = file[0];
    this.profilePicture = file;
    this.imageChangedType = type;
    this.imageChangedRatio = this.imageChangedRatioLogo;
    this.modalRef = this.modalService.show(this.modalImageCropper, this.modalConfig2);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.profilePicture = event.base64;
  }

  async saveProfilePicture() {
    const fileProfile = this.userlog.base64ToFile(this.profilePicture, 'profilePicture.png');
    const formData = new FormData();
    formData.append('file', fileProfile)
    try {
      this.loading = true;
      const resp = await this.userService.userUpdateProfilePicture(formData); 
      let userLstge = lstge.get('user_kuvid');
      let activedAccount = lstge.get('actived_account');
      userLstge.profilePicture = resp['profilePicture'];
      lstge.set('user_kuvid', userLstge);

      if (activedAccount && activedAccount.is === 'user'){
        activedAccount.profilePicture = resp['profilePicture'];
        lstge.set('actived_account', activedAccount);
      }
      this.loading = false;

      window.location.reload();
    } catch (error) {
      console.log(error);
      
      this.loading = false;
      this.userService.handleErrorRequest(error);
    }
  }

  endModalAddress(shippingList) {
    if (shippingList !== null){
      this.shipping = shippingList;
    }
    this.modalRef.hide();
  }

  endModalCreditCard(creditCardList) {
    if (creditCardList){
      this.creditCards = creditCardList;
    }
    this.modalRef.hide();
  }
}
