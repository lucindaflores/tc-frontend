export interface ProductCondensed {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  originName: string;
}

export interface ProductModel {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  active: boolean;

  categoryId: number;
  categoryName: string;

  originId: number;
  originName: string;

  materialSet: Material[];
}

export interface Material {
  id: number;
  name: string;
}
