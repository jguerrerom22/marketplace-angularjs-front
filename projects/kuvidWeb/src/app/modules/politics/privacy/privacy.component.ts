import { Component, OnInit } from '@angular/core';
import { UserlogService } from '../../../shared/userlog.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.sass']
})
export class PrivacyComponent implements OnInit {

  constructor(public userlog: UserlogService) { }

  ngOnInit(): void {
  }

}
