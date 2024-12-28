import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartModel } from '../modules/cart.module';
import { ProductModel } from '../modules/product.module';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartModel;

  constructor(private http: HttpClient) {
    this.cart = {
      id: 0,
      fullName: '',
      address: '',
      creditNumber: '',
      total: 0,
      products: []
    };
  }

  addOrEditCartItem(item: ProductModel): void {
    const existingProduct = this.cart.products.find(product => product.id === item.id);
    if (!existingProduct) {
      this.cart.products.push(item);
    } else {
      this.cart.products = this.cart.products.map(product => {
        if (product.id === item.id) {
          return { ...product, ...item };
        }
        return product;
      });
    }
    this.calculateTotal();
  }

  removeCartItem(item: ProductModel): void {
    this.cart.products = this.cart.products.filter(product => product.id !== item.id);
    this.calculateTotal();
  }

  submitCartItem(cartItem: CartModel): void {
    this.cart.id = cartItem.id;
    this.cart.address = cartItem.address;
    this.cart.creditNumber = cartItem.creditNumber;
    this.cart.fullName = cartItem.fullName;
    this.cart.total = cartItem.total;
  }

  showCartItem(): CartModel {
    return this.cart;
  }

  private calculateTotal(): void {
    this.cart.total = this.cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart(): void {
    this.cart = {
      id: 0,
      fullName: '',
      address: '',
      creditNumber: '',
      total: 0,
      products: []
    };
  }
}
