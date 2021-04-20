import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

   // tslint:disable: max-line-length
   @Input() index = 0;
   @Input() companie = '';
   @Input() company = {
                       companyId: '',
                       companyLogo: [],
                       companyName: '',
                       createdAt: '',
                       description: '',
                       items: [],
                       media: [],
                       postId: '',
                       lastReview: {
                           comment: '',
                           date: '',
                           rate: 5,
                           user: {
                             firstName: '',
                             lastName: '',
                             profilePicture: '',
                             _id: ''
                           }},
                       reviewsCount: 4
   };
   @Input() post = {avatar: '', image: '', description: '', coments: '', datepublic: ''}
   @Input() selected = false;
 
   @ViewChild('postOwlElement', {static: false}) postOwlElement: OwlCarousel;
 
   constructor( private sanitizer: DomSanitizer) { }
 
   ngOnInit(): void {
     console.log(this.company);
   }

   getembed(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }
}
