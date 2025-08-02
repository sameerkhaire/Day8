import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CART_ID, RECEIPT_ID } from '../../app.constant';
import { Receipt } from '../../models/receipt';
import { CartService } from '../../services/cart.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styles: [
  ]
})
export class ReceiptComponent implements OnInit,  OnDestroy {
  receipt: Receipt | any;

  constructor(private router: Router
    , private utilService: UtilService
    , private cartService: CartService) {

  }
  ngOnInit(): void {
    let encData = localStorage.getItem(RECEIPT_ID);
    this.cartService.removeCart();
    if (encData != undefined) {
      this.receipt = this.utilService.Decrypt(encData);
    }
    else {
      this.router.navigate(['/notfound']);
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem(RECEIPT_ID);
  }

}
