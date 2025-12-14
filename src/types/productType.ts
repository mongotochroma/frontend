export interface Review {
  _id: string;
  shoeId: string;
  userName: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  sizes: number[];
  images: string;
  description: string;
  averageRating: number;

  reviews?: Review[];
}
