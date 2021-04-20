import { Component, OnInit, HostListener } from '@angular/core';

import { UserlogService } from '../../../shared/userlog.service';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-vids',
  templateUrl: './vids.component.html',
  styleUrls: ['./vids.component.sass']
})
export class VidsComponent implements OnInit {
  company: any;
  vids = [];
  temp: any;

  skip = 0;
  limit = 6;

  constructor(public userlog: UserlogService, private postService: PostService) { }

  ngOnInit(): void {
    this.callPosts();
  }

  async callPosts() {
    let result = [];
    try {
      const data = await this.postService.postAll(this.skip,this.limit, {});
      this.temp = data;
      result = this.vids.concat(this.temp);
      this.vids = result;
      console.log(this.vids);
    } catch (error) {
      this.postService.handleErrorRequest(error)
    }   
  }

  callMorePost() {
    this.skip = this.skip + 6
    this.callPosts()
  }


}
