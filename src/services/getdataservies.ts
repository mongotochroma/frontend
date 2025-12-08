import type { Product } from "../types/productType";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/api/shoes`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  } else {
    const data = await response.json();
    return data as Product[];
  }
};

export const createProduct = async (formData: {
  price: number;
  sizes: number[];
  name: string;
  brand: string;
  images: string;
  description: string;
}) => {
  const res = await fetch(
    `${API_URL}/api/shoes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return res.json();
};
