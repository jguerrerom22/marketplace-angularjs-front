import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';

import { ExperienceService } from '../../../services/experience.service';

@Component({
  selector: 'app-storys',
  templateUrl: './storys.component.html',
  styleUrls: ['./storys.component.sass']
})
export class StorysComponent implements OnInit {
  stories = [];
  tempStories: any;

  @Input() horizontal: false;
  showleft = false;
  showright = true;
  storyActive = false;
  @ViewChild('vids') owlElement: OwlCarousel;
  constructor(private experienceService: ExperienceService) { }

  ngOnInit(): void {
    this.callStories();
  }

  async callStories() {
    try {
      this.stories = await this.experienceService.experiencesAll(0,0);
    } catch (error) {
      this.experienceService.handleErrorRequest(error);
    }
  }

  activestory(stories) {
    this.storyActive = true;
  }

  dime(contenedor) {
    /* console.log(contenedor.scrollLeft);
    console.log(contenedor.offsetWidth); */
  }

  scrolltoleft() {
    this.owlElement.previous([200]);
  }

  scrolltoright() {
    this.owlElement.next([200]);
  }

  


  checkVisibilidad(contenedor) {}

}
