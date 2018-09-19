import { Component, OnInit, Input } from '@angular/core';
import { NguCarousel, NguCarouselStore } from '@ngu/carousel';
import { Banner } from '../model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() banners: Banner[];
  public carouselBanner: NguCarousel;
  constructor() { }

  ngOnInit() {
    this.carouselBanner = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true,
        pointStyles: `
          .ngucarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngucarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: #58A06E;
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngucarouselPoint li.active {
              background: #01573c;
              width: 10px;
          }
        `
      },
      load: 2,
      loop: true,
      touch: true
    };
  }

  /* It will be triggered on every slide*/
  onmoveFn(data: NguCarouselStore) {

  }
}
