import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
    httpHeaders: HttpHeaders | undefined;
    constructor(private httpClient: HttpClient) {
        this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
    }

    GetUserOrders(userId: number): Observable<HttpResponse<Order[]>> {
        return this.httpClient.get<Order[]>(environment.apiAddress + '/order/getuserorders/' + userId, { headers: this.httpHeaders, observe: 'response' });
    }
    
    GetOrderDetails(orderId: string): Observable<HttpResponse<Order>> {
        return this.httpClient.get<Order>(environment.apiAddress + '/order/getorderdetails/' + orderId, { headers: this.httpHeaders, observe: 'response' });
    }
}
