import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';


import { PostService } from '../../../services/post.service';
import { UserlogService } from '../../../shared/userlog.service';
import { LocalStorage as lstge } from '../../../shared/local-storage.service';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.sass']
})
export class ManagePostComponent implements OnInit {
  
  search = '';
  activeAddColor = false;
  posts: any;
  activedAccount: any;
  postEditing: any;

  constructor(private modalService: BsModalService, private postService: PostService, public userlog: UserlogService) { }
  modalRef: BsModalRef;
  @ViewChild('formPost') modal: TemplateRef<any>;
  modalConfig = {
    class: 'modal-lg modal-dialog-centered',
    keyboard: true,
    ignoreBackdropClick: true
  };

  ngOnInit(): void {
    this.activedAccount = lstge.get('actived_account');
    this.loadPosts();
  }

  openModal() {
    this.modalRef = this.modalService.show(this.modal, this.modalConfig);
  }

  openEditionModal(post: any) {
    this.postEditing = post;
    this.openModal();
  }

  async loadPosts() {
    if (this.activedAccount && this.activedAccount.is === 'company'){
      try {
        const data = await this.postService.postAll(0,0,{ company: this.activedAccount.id })
        this.posts = data;
      } catch (error) {
        this.postService.handleErrorRequest(error);
      }  
    }
  }

  endPostForm(data: any) {
    if (data !== null) this.loadPosts();
    this.modalRef.hide();
    this.postEditing = undefined;
  }
}
