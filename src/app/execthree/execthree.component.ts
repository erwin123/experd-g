import { Component, OnInit } from '@angular/core';
import { Banner } from '../model';

@Component({
  selector: 'app-execthree',
  templateUrl: './execthree.component.html',
  styleUrls: ['./execthree.component.css']
})
export class ExecthreeComponent implements OnInit {
  imgRwd: Array<File> = new Array();
  imgs: Array<Banner> = new Array();
  imgsSample: Array<Banner> = new Array();
  imageSrc: string;
  loadedPhoto: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

  readUrlImg(event: any) {
    this.loadedPhoto = true;
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          console.log("loaded");
          this.imgs.push({ BannerPath: event.target.result, BannerDesc: "" });
          console.log(this.imgs);
          this.loadedPhoto = false;
        }
        this.imgRwd.push(event.target.files[i]);
      }
    }
  }
  onSubmit() {

  }

}

