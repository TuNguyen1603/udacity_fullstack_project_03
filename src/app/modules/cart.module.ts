import { ProductModel } from "./product.module";


export interface CartModel {
    id: number;
    fullName: string;
    address: string;
    creditNumber: string;
    total: number;
    products: ProductModel[];
}
