import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {OwlCarousel} from 'ngx-owl-carousel';

import { LocalStorage as lstge } from '../../../shared/local-storage.service';
import { CompanyService } from './../../../services/company.service'
import { PostService } from './../../../services/post.service'
import { ItemService } from './../../../services/item.service'
import { UserService } from './../../../services/user.service'
import { CategoryService } from './../../../services/category.service'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {

  @ViewChild('categories') owlElement: OwlCarousel;
  
  modalRef: BsModalRef;
  @ViewChild('rateCompany') modal: TemplateRef<any>;
  modalConfig = {
    class: 'modal-lg modal-dialog-centered',
    keyboard: true,
    ignoreBackdropClick: true
  };
  smallModalConfig = {
    class: 'modal-sm modal-dialog-centered',
    keyboard: true,
  }
  
  sub: any;
  idCompany: string;
  posts = [];
  items = [];
  categories = [];
  currentCategory = '';
  infoCompany: any;

  temp: any;
  skip = 0;
  skipPosts = 0;
  limit = 20;
  limitPosts = 10;

  rating = { rate: 0, comment: '' };
  ratingError: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private companyService: CompanyService,
    private postService: PostService, 
    private userService: UserService, 
    private router: Router, 
    private modalService: BsModalService
  ) { }

  ngOnInit(): void { 
    // Params variables
    this.route.params.subscribe(params => {
      this.idCompany = params['id'];
      this.callCompanyData();
      this.callPosts();
    });
  }

  //---------- POSTS
  async callMorePosts() {
    this.skipPosts += this.limitPosts;
    this.callCompanyData();
    this.callPosts();
  }

  async callPosts() {
    try {
      this.posts = await this.postService.postAll(this.skipPosts, this.limitPosts, { company: this.idCompany });
    } catch (error) {
      this.postService.handleErrorRequest(error);
    }
  }

  async callCompanyData() {
    try {
      // Company Info
      this.infoCompany = await this.companyService.companyInfo(this.idCompany);
    } catch (error) {
      this.companyService.handleErrorRequest(error);
    }
  }

  async follow(){
    try {
      if (!lstge.get('user_kuvid')){
        this.router.navigate(['user/login']);
        return;
      }
      const data = await this.userService.userFollow({
        company: this.idCompany
      });  
      if (data['message'] === 'success') this.infoCompany.isFollowed = true;
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  async unfollow(){
    try {
      const data = await this.userService.userUnfollow({
        company: this.idCompany
      });
      if (data['message'] === 'success') this.infoCompany.isFollowed = false;
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  createPost(e) {
    e.preventDefault();
  }

  // --------- Rating

  openRatingModal() {
    if (!lstge.get('user_kuvid')){
      this.router.navigate(['user/login']);
      return;
    }
    
    if (this.infoCompany.review){
      const review = this.infoCompany.review;
      this.rating = { rate: review.rate, comment: review.comment };  
    } else {
      this.rating = { rate: 0, comment: '' };
    }
    this.ratingError = false;
    this.modalRef = this.modalService.show(this.modal, this.smallModalConfig);
  }

  async saveRating() {
    try {
      if (this.rating.rate === 0){
        this.ratingError = true;
      }
      const respReview = await this.companyService.companyRate(this.idCompany, this.rating);
      this.infoCompany.review = respReview.review;
      this.infoCompany.rating = respReview.statsRating;
      this.callCompanyData();
      this.modalRef.hide();
      
    } catch (error) {
      this.companyService.handleErrorRequest(error);
    }
  }

  createComment(data) {}
}
