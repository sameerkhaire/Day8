import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RECEIPT_ID } from '../../app.constant';
import { Cart } from '../../models/cart';
import { Payment } from '../../models/payment';
import { RazorPayOrder } from '../../models/razorPayOrder';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { ExternalLibraryService, UtilService } from '../../services/util.service';
import { environment } from '../../../environments/environment';
declare const Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',

})
export class PaymentComponent implements OnInit {
  RAZORPAY_OPTIONS = {
    "key": "",
    "amount": "",
    "currency": "",
    "name": "",
    "description": "",
    "image": "https://www.dotnettricks.com/images/d-icon.png",
    "order_id": "",
    "handler": (res: any) => {
      console.log(res);
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": "NA"
    },
    "theme": {
      "color": "#4285F4"
    }
  };
  cart: Cart | any;
  user: User | any;
  constructor(private cartService: CartService, private exLibaryService: ExternalLibraryService, private authService: AuthService, private paymentService: PaymentService, private router: Router, private utilService: UtilService, private zone: NgZone) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.user = this.authService.user;

    this.exLibaryService.lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();
    if (this.cart.items.length > 0) {
      let order: RazorPayOrder = new RazorPayOrder(this.cart.grandTotal, 'INR', 'NA');
      this.paymentService.CreateOrder(order).subscribe(res => {
        if (res.status == 200)
          this.RAZORPAY_OPTIONS.order_id = res.body.orderId;
      })
    }
    else {
      this.router.navigate(['cart']);
    }
  }
  payWithRazorPay() {
    this.RAZORPAY_OPTIONS.name = this.user.name;
    let items = "";
    for (let i = 0; i < this.cart.items.length; i++) {
      items += this.cart.items[i].name + ",";
    }
    this.RAZORPAY_OPTIONS.description = items;
    this.RAZORPAY_OPTIONS.key = environment.razorPay.key;
    this.RAZORPAY_OPTIONS.amount = this.cart.grandTotal.toString();
    this.RAZORPAY_OPTIONS.currency = 'INR';

    this.RAZORPAY_OPTIONS.prefill.name = this.user.name;
    this.RAZORPAY_OPTIONS.prefill.email = this.user.email;
    this.RAZORPAY_OPTIONS.prefill.contact = this.user.phoneNumber;

    this.RAZORPAY_OPTIONS.handler = this.razorPaySuccessHandler.bind(this);
    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
    razorpay.open();
  }
  razorPaySuccessHandler(res: any) {
    var payment = new Payment();

    payment.cartId = this.cart.id;
    payment.items = this.cart.items;
    payment.total = this.cart.total;
    payment.tax = this.cart.tax;
    payment.grandTotal = this.cart.grandTotal;
    payment.signature = res.razorpay_signature;
    payment.orderId = res.razorpay_order_id;
    payment.currency = this.RAZORPAY_OPTIONS.currency;
    payment.email = this.user.email;
    payment.paymentId = res.razorpay_payment_id;
    payment.userId = this.user.id;

    //for updating angular context, if you are handing things on same page
    //this.cd.detectChanges();

    this.paymentService.SavePaymentDetails(payment).subscribe(res => {
      console.log(res);
      if (res.status == 200) {
        let encData = this.utilService.Encrypt(res.body);
        this.cartService.removeCart();
        localStorage.setItem(RECEIPT_ID, encData);
        //inside subscribe it's required
        this.zone.run(() => this.router.navigate(['receipt']));
      }
    });
  }
}
