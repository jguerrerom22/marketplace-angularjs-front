import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStorage as lstge } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private items = [];
    private cart = new BehaviorSubject<number[]>([]);

    cart$ = this.cart.asObservable();

    constructor() {}

    addCart(items: any[]){
        this.items = items;
        this.cart.next(this.items);
        lstge.set('cart', this.items);        
    }
}