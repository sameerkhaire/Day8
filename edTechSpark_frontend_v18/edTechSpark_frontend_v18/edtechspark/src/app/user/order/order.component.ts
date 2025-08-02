import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../..//models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {
  order: Order | any;
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  constructor() {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.orderService.GetOrderDetails(id).subscribe(res => {
        if (res.status == 200 && res.body != null) {
          this.order = res.body;
        }
      });
    });
  }
}
