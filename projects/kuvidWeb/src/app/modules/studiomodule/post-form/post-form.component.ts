import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { UserlogService } from '../../../shared/userlog.service';
import { PostService } from '../../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.sass']
})
export class PostFormComponent implements OnInit {

  @Input() company: string;
  @Input() post: any;
  @Output() endEdition = new EventEmitter<any>();
  
  public loading = false;

  editing = false;
  textPost  = '';
  imageChangedEvent: any = '';
  activeImage: any;
  selectImages = [
    {image: '', file: undefined}
  ];
  step = 1;
  galeryActive = true;

  constructor(
    private userlog: UserlogService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.post) {
      this.textPost = this.post.description;
      this.editing = true;
    }
  }

  addImage() {
    this.selectImages.push({image: '', file: undefined});
    this.galeryActive = false;
    setTimeout(() => {
      this.galeryActive = true;
    }, 100);

  }

  removeImage(i) {
    this.selectImages.splice(i, 1);
    this.galeryActive = false;
    setTimeout(() => {
      this.galeryActive = true;
    }, 100);
  }

  addEmoji(emoji) {
    this.textPost += emoji.emoji.native;
  }

  changeImageFile(i, file) {
    this.step = 2;
    this.imageChangedEvent = file[0];
    this.activeImage = i;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.selectImages[this.activeImage].image = event.base64;
  }

  async savePost() {
    if (this.editing)
      await this.updatePost();
    else
      await this.createPost();
  }

  async createPost() {
    try {
      const formData = new FormData();
      formData.append('company', this.company);
      formData.append('description', this.textPost);
      for (var x in this.selectImages){
        if (this.selectImages[x].image){
          formData.append('media', this.userlog.base64ToFile(this.selectImages[x].image, `media${x}.png`));
        }
      }
      this.loading = true;
      const resp = await this.postService.postCreate(formData); 
      this.loading = false;

      this.endEdition.emit(resp);

    } catch (error) {
      this.postService.handleErrorRequest(error);
    }
  }

  async updatePost() {
    try {
      this.loading = true;
      const resp = await this.postService.postUpdate(this.post.postId, { description: this.textPost }); 
      this.loading = false;

      this.endEdition.emit(resp);

    } catch (error) {
      this.postService.handleErrorRequest(error);
    }
  }

  closeModal() {
    this.endEdition.emit(null);
  }

  goToPost(){
    this.closeModal();
    this.router.navigate(['/vid/post', this.post.postId]);
  }
}
