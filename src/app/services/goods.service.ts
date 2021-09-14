import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { good } from '../components/interfaces/good.interface';

@Injectable({
  providedIn: 'root',
})
export class GoodsService {
  constructor(
    private fs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}
  getAllGoods() {
    return this.fs.collection<good>('goods').snapshotChanges();
  }
  addNewGood(name: any, price: any, image: File) {
    return new Promise((resolve: any, reject: any) => {
      let ref = this.storage.ref(`goods/${image.name}`);
      ref.put(image).then(() => {
        ref.getDownloadURL().subscribe((photoUrl) => {
          this.fs
            .collection('goods')
            .add({
              name,
              price,
              photoUrl,
            })
            .then(() => resolve('hello'));
        });
      });
    });
  }
}
