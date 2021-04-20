import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';

import { PostService } from '../../services/post.service';
import { BannerService } from '../../services/banner.service';
import { UserlogService } from '../../shared/userlog.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {
  companies = [];
  banners = [];
  temp: any;
  visual = true;

  skip = 0;
  limit = 3;
  constructor(
    private postService: PostService, 
    private bannerService: BannerService,
    public userlog: UserlogService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.callPost();
  }

  async callPost() {
    let result = [];

    try {
      const data = await this.postService.postAll(this.skip,this.limit,{});
      this.temp = data;
      result = this.companies.concat(this.temp);
      this.companies = result;
    } catch (error) {
      this.postService.handleErrorRequest(error)
    }
  }

  callNewPost() {
    this.skip = this.skip + 3
    this.callPost()
  }

  ngOnDestroy() {
    
  }

  

}
