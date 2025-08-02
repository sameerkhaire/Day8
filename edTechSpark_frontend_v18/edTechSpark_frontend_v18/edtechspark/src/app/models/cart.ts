
import { Guid } from 'guid-typescript';
import { CART_ID } from '../app.constant';
import { UtilService } from '../services/util.service';

export class Cart {
  id: string;
  items: any;
  total: number = 0;
  tax: number = 0;
  grandTotal: number = 0;
  userId: number = 0;
  createdDate: string | any;
  constructor() {
    this.id = this.getCartId();
    this.items = [];
    this.total = 0;
    this.grandTotal = 0;
    this.tax = 0;
  }
  getCartId() {
    let id = undefined;
    let cid = localStorage.getItem(CART_ID);
    if (cid == undefined) {
      //id = UtilService.GenerateGUID();
      id = Guid.create().toString();
      localStorage.setItem(CART_ID, id);
    }
    else {
      id = cid;
    }
    return id;
  }
}
