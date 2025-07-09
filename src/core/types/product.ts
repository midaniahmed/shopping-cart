export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  tags: string[];
  reviews?: Review[];
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  replies: number;
}
