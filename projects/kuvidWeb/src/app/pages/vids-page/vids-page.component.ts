import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vids-page',
  templateUrl: './vids-page.component.html',
  styleUrls: ['./vids-page.component.sass']
})
export class VidsPageComponent implements OnInit {
  temp: any;
  vids = [];
  constructor() { }

  ngOnInit(): void {
   
  }

}
