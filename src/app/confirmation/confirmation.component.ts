import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CartModel } from '../modules/cart.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ConfirmationComponent implements OnInit {
  cart: CartModel;

  constructor(private cartService: CartService, private router: Router) {
    this.cart = this.cartService.showCartItem();
  }

  ngOnInit(): void {
    if (!this.cart.fullName || !this.cart.address || !this.cart.creditNumber) {
      this.router.navigate(['/cart']);
    }
  }

  backToProductList(): void {
    this.router.navigate(['/']);
  }
}
