import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { GoodsService } from 'src/app/services/goods.service';
import { good } from '../interfaces/good.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  goods: good[] = [];
  goodsObservabe!: Subscription;
  add!: number;
  showSppiner = false;

  constructor(
    private goodsService: GoodsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.goodsObservabe = this.goodsService.getAllGoods().subscribe((data) => {
      this.goods = data.map((el) => {
        return {
          id: el.payload.doc.id,
          ...el.payload.doc.data(),
        };
      });
    });
  }
  ngOnDestroy() {
    this.goodsObservabe.unsubscribe();
  }
  addCard(i: number) {
    this.add = i;
  }
  buy(amount: string) {
    let goodId = this.goods[this.add];
    let data = {
      name: goodId.name,
      price: goodId.price,
      amount: amount,
    };
    this.cartService.addToCart(data).then(() => (this.add = -1));
  }
}
