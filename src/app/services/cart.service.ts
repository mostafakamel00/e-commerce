import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { good } from '../components/interfaces/good.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}
  addToCart(data: good) {
    return this.afs
      .collection(`users/${this.authService.userId}/cart`)
      .add(data);
  }
  getAll() {
    return this.afs
      .collection(`users/${this.authService.userId}/cart`)
      .snapshotChanges();
  }
  delete(id: any) {
    return this.afs.doc(`users/${this.authService.userId}/cart/${id}`).delete();
  }
  save(id: any, amount: any) {
    return this.afs.doc(`users/${this.authService.userId}/cart/${id}`).update({
      amount,
    });
  }
}
