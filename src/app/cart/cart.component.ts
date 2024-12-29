import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { CartModel } from '../modules/cart.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CartComponent implements OnInit {
  cart: CartModel;
  fullName: string = '';
  address: string = '';
  creditNumber: string = '';

  constructor(private cartService: CartService, private router: Router) {
    this.cart = this.cartService.showCartItem();
  }

  ngOnInit(): void {}

  submitOrder(): void {
    if (this.isValidForm()) {
      this.cartService.submitCartItem({
        id: this.cart.id,
        fullName: this.fullName,
        address: this.address,
        creditNumber: this.creditNumber,
        total: this.cart.total,
        products: this.cart.products,
      });
      alert('Order submitted successfully!');
      this.router.navigate(['/confirmation']);
    }
  }

  isValidForm(): boolean {
    return (
      this.fullName.length >= 3 &&
      this.address.length >= 5 &&
      this.creditNumber.length === 16
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
    this.cart = this.cartService.showCartItem();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeCartItem(productId);
    this.cart = this.cartService.showCartItem();
  }
}
