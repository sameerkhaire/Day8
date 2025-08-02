import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent implements OnInit {
  user: User | any;
  orders: Order[] | any;
  constructor(private orderService: OrderService, private authService: AuthService) {
    this.user = authService.user;
  }

  ngOnInit(): void {
    this.orderService.GetUserOrders(this.user.id).subscribe(res => {
      if (res.status == 200) {
        this.orders = res.body;
      }
    });
  }
}
