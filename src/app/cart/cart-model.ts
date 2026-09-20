import  {ProductModel} from '../product/product-model';

export interface CartModel {
  product: ProductModel;
  quantity: number;
}

