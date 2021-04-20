import { Component, OnInit } from '@angular/core';

import { UserlogService } from '../../../shared/userlog.service';
import { LocalStorage as lstge } from '../../../shared/local-storage.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.sass']
})
export class SelectUserComponent implements OnInit {
  

  userActive = '';
  user: any;
  accounts = [];
  accountActived: any;

  activeMenu = false;
  constructor(public userlog: UserlogService) { }

  ngOnInit(): void {
    const userLstge = lstge.get('user_kuvid');
    this.user = { id: userLstge.id, name: userLstge.firstName + ' ' + userLstge.lastName };
    this.accounts = userLstge.companies;
    this.accountActived = lstge.get('actived_account');
  }

  setActivedCompany(company: any) {
    this.userlog.setActivedAccount(company, 'company');
  }

  setActivedUser() {
    this.userlog.setActivedAccount(this.user, 'user');
  }
}
