import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-eduvid',
  templateUrl: './eduvid.component.html',
  styleUrls: ['./eduvid.component.sass']
})
export class EduvidComponent implements OnInit {

  coursesList = [
    {
      category: 'Finanzas',
      courses: [
        {
          companyId: "5f05ce8bf23740279000e944",
          companyLogo: [
            {_id: "5f05d010f23740279000e9c4", size: "original", url: "https://firebasestorage.googleapis.com/v0/b/kuvid-…=media&token=86c1d440-c122-11ea-8346-bb4d694038d6", type: "jpeg"},
            {_id: "5f05d010f23740279000e9c4", size: "original", url: "https://firebasestorage.googleapis.com/v0/b/kuvid-…=media&token=86c1d440-c122-11ea-8346-bb4d694038d6", type: "jpeg"},
            {_id: "5f05d010f23740279000e9c4", size: "original", url: "https://firebasestorage.googleapis.com/v0/b/kuvid-…=media&token=86c1d440-c122-11ea-8346-bb4d694038d6", type: "jpeg"}
          ],
          companyName: "Derek",
          createdAt: "2020-07-08T13:48:59.021Z",
          description: "Últimos días de rebajas, ven antes de que se agoten las existencias",
          items:  [],
          media: [{
            type: "jpeg",
            url: "https://firebasestorage.googleapis.com/v0/b/kuvid-280002.appspot.com/o/postsMedia%2F1594216137698_md.jpeg?alt=media&token=c55895a0-c121-11ea-8346-bb4d694038d6"
          }],
          postId: "5f05cecbf23740279000e95b",
          rating: 10
        },
        {
          companyId: "5f05ce8bf23740279000e944",
          companyLogo: [
            {_id: "5f05d010f23740279000e9c4", size: "original", url: "https://firebasestorage.googleapis.com/v0/b/kuvid-…=media&token=86c1d440-c122-11ea-8346-bb4d694038d6", type: "jpeg"},
            {_id: "5f05d010f23740279000e9c4", size: "original", url: "https://firebasestorage.googleapis.com/v0/b/kuvid-…=media&token=86c1d440-c122-11ea-8346-bb4d694038d6", type: "jpeg"},
            {_id: "5f05d010f23740279000e9c4", size: "original", url: "https://firebasestorage.googleapis.com/v0/b/kuvid-…=media&token=86c1d440-c122-11ea-8346-bb4d694038d6", type: "jpeg"}
          ],
          companyName: "Derek",
          createdAt: "2020-07-08T13:48:59.021Z",
          description: "Últimos días de rebajas, ven antes de que se agoten las existencias",
          items:  [],
          media: [{
            type: "jpeg",
            url: "https://firebasestorage.googleapis.com/v0/b/kuvid-280002.appspot.com/o/postsMedia%2F1594216137698_md.jpeg?alt=media&token=c55895a0-c121-11ea-8346-bb4d694038d6"
          }],
          postId: "5f05cecbf23740279000e95b",
          rating: 10
        }
      ]
    }
  ];
  @ViewChildren('categories') owlElement:QueryList<OwlCarousel>;
  constructor() { }

  ngOnInit(): void {
  }

  callMoreEduvid() {

  } 

  scrolltoleft(id) {
    this.owlElement.toArray()[id].previous([200]);
  }

  scrolltoright(id) {
    this.owlElement.toArray()[id].next([200]);
  }

}
