import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorage {
    
    constructor() { }

    public static get(name: string) {
        try {
            const value = JSON.parse(localStorage.getItem(name));
            return value;
        } catch (e) {
            return localStorage.getItem(name);
        }
    }

    public static set(name: string, value: any){
        if (typeof value === 'object'){
            localStorage.setItem(name, JSON.stringify(value));
        } else {
            localStorage.setItem(name, value);
        }
    }

    public static delete(name: string){
        localStorage.removeItem(name);
    }

    public static clear(){
        localStorage.clear();
    }
}
