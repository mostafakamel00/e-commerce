import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { shopping } from '../interfaces/shoping.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: shopping[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getAll().subscribe((cart) => {
      this.cart = cart.map((shopping) => {
        return {
          id: shopping.payload.doc.id,
          ...(shopping.payload.doc.data() as {}),
        };
      });
      console.log(this.cart);
    });
  }
  delete(i: any) {
    this.cartService.delete(this.cart[i].id);
  }
  save(i: any) {
    this.cartService.save(this.cart[i].id, this.cart[i].amount);
  }
}
