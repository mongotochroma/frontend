import type { Product, Review } from "../types/productType";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/api/shoes`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

export const createProduct = async (formData: {
  price: number;
  sizes: number[];
  name: string;
  brand: string;
  images: string;
  description: string;
}): Promise<Product> => {
  const res = await fetch(`${API_URL}/api/shoes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return res.json();
};
export const createReview = async (formData: {
  shoeId: string;
  userName: string;
  rating: number;
  review: string;
}): Promise<Review> => {
  const res = await fetch(`${API_URL}/api/ratings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to create review");
  }

  return res.json();
};

export const fetchReviews = async (shoeId: string): Promise<Review[]> => {
  const res = await fetch(`${API_URL}/api/ratings/${shoeId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
};

export const deleteProduct = async (shoeId: string) => {
  const res = await fetch(`${API_URL}/api/shoes/${shoeId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return res.json();
};
//delete review
export const deleteReview = async (reviewId: string) => {
  const res = await fetch(`${API_URL}/api/ratings/${reviewId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete review");
  }

  return res.json();
};