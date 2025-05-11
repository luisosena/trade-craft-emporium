
export interface User {
  id: string;
  email: string;
  name: string;
  isSeller: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  category: string;
  sellerId: string;
  sellerName: string;
  images: string[];
  properties: Record<string, string>; 
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}
