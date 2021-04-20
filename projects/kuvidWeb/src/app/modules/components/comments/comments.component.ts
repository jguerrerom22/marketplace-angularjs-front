import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {
  
  @Input() reviews = [];
  @Input() idResource = '';
  @Input() canAdd = true;
  @Output() newReview = new EventEmitter<any>();

  comment = '';
  loading = false;
  temp: any;
  sub: any;


  ratingTest = 4;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.idResource = params['id'];
    });
  }

  create(){
    if (this.comment) {
      this.loading = true;
      this.newReview.emit({id: this.idResource, comment: this.comment});
      this.comment = '';
      this.loading = false;  
    }
  }
}
