import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { CART_ID } from '../app.constant';
import { UtilService } from './util.service';

declare const localStorage: any;

@Injectable(
    { providedIn: 'root' }
)
export class CartService {
    private cart: Cart;
    private httpHeaders;

    constructor(private httpClient: HttpClient, private utilService: UtilService) {
        this.cart = new Cart();
        this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
    }
    saveCart() {
        if (localStorage[this.cart.id] != null) {

            let encData = this.utilService.Encrypt(this.cart.items);
            localStorage[this.cart.id] = encData;
        }
        else {
            this.cart.id = this.cart.getCartId();
            localStorage[this.cart.id] = "";
        }
    }
    saveCartToDB(cart: Cart): Observable<HttpResponse<any>> {

        return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + '/cart/savecart', JSON.stringify(cart), { headers: this.httpHeaders, observe: 'response' });
    }

    getCart() {
        if (localStorage != null && localStorage[this.cart.id] != undefined && localStorage[this.cart.id] != "") {
            var encData = localStorage[this.cart.id];
            this.cart.items = this.utilService.Decrypt(encData);
            this.calculateCart();
        }
        return this.cart;
    }
    clearCart() {
        this.cart.items = [];
        this.cart.total = 0;
        if (localStorage != null) {
            localStorage[this.cart.id] = '';
        }
    };

    removeCart() {
        localStorage.removeItem(this.cart.id);
        localStorage.removeItem(CART_ID);
        this.cart.items = [];
        this.cart.total = 0;
        this.cart.tax = 0;
    };

    calculateCart() {
        let price = 0;
        for (let i = 0; i < this.cart.items.length; i++) {
            const item = this.cart.items[i];
            price += this.cart.items[i].total = item.quantity * item.unitPrice;
        }
        this.cart.total = price;
        this.cart.tax = Math.round((price * 5) / 100);
        this.cart.grandTotal = this.cart.total + this.cart.tax;
    }

    addToCart(itemId: number, name: string, imageUrl: string, unitPrice: number, quantity: number) {
        if (quantity !== undefined) {
            //not in use for this website:
            //update Quantity for existing item
            let found = false;
            for (let i = 0; i < this.cart.items.length && !found; i++) {
                const item: CartItem = this.cart.items[i];
                if (item.itemId === itemId) {
                    found = true;
                    item.quantity = item.quantity + quantity;
                }
            }
            // new item, add now
            if (!found) {
                const item = new CartItem(itemId, name, imageUrl, unitPrice, quantity);
                this.cart.items.push(item);
            }
            this.calculateCart();
            // save changes
            this.saveCart();
        }
    }

    deleteFromCart(itemId: number) {
        for (let i = 0; i < this.cart.items.length; i++) {
            const item = this.cart.items[i];
            if (item.itemId === itemId) {
                this.cart.items.splice(i, 1);
            }
        }
        this.calculateCart();
        // save changes
        this.saveCart();
    }

    checkCart(id) {
        return this.httpClient.get<boolean>(`${environment.apiAddress}/cart/CheckCart/${id}`, { headers: this.httpHeaders, observe: 'response' });
    }


}
