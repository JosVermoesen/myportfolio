import { Component, OnInit } from '@angular/core';
import Swiper, { SwiperOptions, Pagination } from 'swiper';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {
  public swiperConfig: SwiperOptions = {
    pagination: true,
   };

  constructor() { }

  ngOnInit() {
    Swiper.use([Pagination]);
  }

}
