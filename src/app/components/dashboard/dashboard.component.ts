import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoodsService } from 'src/app/services/goods.service';
import { good } from '../interfaces/good.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('image', { static: false }) image!: ElementRef;
  constructor(private goodService: GoodsService) {}

  ngOnInit(): void {}
  addNewGood(form: NgForm) {
    let name = (<good>form.value).name,
      price = (<good>form.value).price,
      image = this.image.nativeElement.files[0];
    // console.log(form.value);
    // console.log(this.image.nativeElement.files[0]);
    this.goodService
      .addNewGood(name, price, image)
      .then((msg) => console.log(msg));
  }
}
