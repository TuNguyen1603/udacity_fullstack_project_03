import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';  // Import Router
import { CartModel } from '../modules/cart.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CartComponent implements OnInit {
  cart: CartModel;
  fullName: string = '';
  address: string = '';
  creditNumber: string = '';

  constructor(private cartService: CartService, private router: Router) {  // Inject Router
    this.cart = this.cartService.showCartItem();
  }

  ngOnInit(): void {}

  submitOrder(): void {
    this.cartService.submitCartItem({
      id: this.cart.id,
      fullName: this.fullName,
      address: this.address,
      creditNumber: this.creditNumber,
      total: this.cart.total,
      products: this.cart.products
    });
    alert('Order submitted successfully!');
    this.router.navigate(['/confirmation']);
  }
}
