import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../../../services/post.service';
import { ItemService } from '../../../services/item.service';
import { UserlogService } from '../../../shared/userlog.service';

@Component({
  selector: 'app-vidpost',
  templateUrl: './vidpost.component.html',
  styleUrls: ['./vidpost.component.sass']
})
export class VidpostComponent implements OnInit {

  // tslint:disable: max-line-length
  temp: any;
  comments = [];
  sub: any;
  publics = [];
  idPost = '';
  postContent: any;
  company: any;
  items = [];
  constructor(
    public postService: PostService, 
    public itemService: ItemService, 
    public userlog: UserlogService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.idPost = params['id']; // (+) converts string 'id' to a number
      this.callPost();
      // In a real app: dispatch action to load the details here.
   });

   for ( let i = 1; i < 10; i++) {
    this.publics.push({name: ' '});
   }
  }


  async callPost() {
    try {
      const data = await this.postService.postGetOne(this.idPost);
      this.postContent = data;
      this.company = {
        companyId: this.postContent.company._id,
        companyLogo: this.postContent.company.logo,
        companyName: this.postContent.company.name,
        createdAt: this.postContent.createdAt,
        description: this.postContent.description,
        items: [],
        media: this.postContent.media,
        postId: '',
        reviewsCount: 4
      };
      this.callItems();

    } catch (error) {
      this.postService.handleErrorRequest(error);
    }
  }

  async createComment(data: any){
    try {
      await this.postService.postReviewCreate(data.id, data.comment);
      this.callComments();
    } catch (error) {
      this.postService.handleErrorRequest(error);
    }
  }

  async callComments() {
    try {
      const data = await this.postService.postGetOne(this.idPost);
      this.temp = data;
      this.postContent.reviews = this.temp.reviews;
    } catch (error) {
      this.postService.handleErrorRequest(error);
    }
    
  }

  async callItems() {
    try {
      const datos = await this.itemService.postItemsAll(this.company.companyId);
      this.temp = datos;
      this.items = this.temp.data;
    } catch (error) {
      this.itemService.handleErrorRequest(error);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
