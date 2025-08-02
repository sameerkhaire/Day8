import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RazorPayOrder } from '../models/razorPayOrder';
import { Payment } from '../models/payment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
    httpHeaders: HttpHeaders;
    constructor(private httpClient: HttpClient) {
        this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
    }

    CreateOrder(order: RazorPayOrder): Observable<HttpResponse<any>> {
        return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + '/payment/createorder',
            JSON.stringify(order), { headers: this.httpHeaders, observe: 'response' });
    }
    
    SavePaymentDetails(payment: Payment): Observable<HttpResponse<any>> {
        return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + '/payment/SavePaymentDetails/', JSON.stringify(payment), { headers: this.httpHeaders, observe: 'response' });
    }
}
