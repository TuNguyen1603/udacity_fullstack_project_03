import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../modules/product.module';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ProductComponent {
  @Input() product!: ProductModel;
  quantity : number = 1;
  constructor(private cartService: CartService) {} // Inject CartService
  addToCart(): void {
    const cartItem = { ...this.product, quantity: this.quantity };
    this.cartService.addOrEditCartItem(cartItem);
    alert(`Added ${this.product.name} to cart successfully!`);
  }
}
