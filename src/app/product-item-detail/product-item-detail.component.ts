import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductModel } from '../modules/product.module';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service'; // Import CartService

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ProductItemDetailComponent implements OnInit {
  product!: ProductModel;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProducts().subscribe((products: ProductModel[]) => {
        this.product = products.find((p) => p.id === +productId)!;
      });
    }
  }

  addToCart(): void {
    const cartItem = { ...this.product, quantity: this.quantity };
    this.cartService.addOrEditCartItem(cartItem);
    alert(`Added ${this.product.name} to cart successfully!`);
  }
}
