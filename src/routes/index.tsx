import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
type Product = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  sizes: number[];
  images: string;
  description: string;
  averageRating: number;
};

export const Route = createFileRoute("/")({
  component: ShopPage,
});

function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  console.log(API_URL);
  useEffect(() => {
    fetch(`${API_URL}api/shoes`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">Error: {error}</div>;
  }

  return (
    <div>
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Shop All Products
        </h1>
        <p className="text-xl text-gray-600">Fresh kicks. Best prices.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price / 100);

  console.log(product.images);

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.images}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
          {product.averageRating} stars
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.brand}</p>

        <p className="text-2xl font-bold text-green-600 mt-4">
          {formattedPrice}
        </p>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.sizes.slice(0, 4).map((size) => (
            <span
              key={size}
              className="text-xs bg-gray-100 px-3 py-1 rounded-full"
            >
              {size}
            </span>
          ))}
          {product.sizes.length > 4 && (
            <span className="text-xs text-gray-500">
              +{product.sizes.length - 4} more
            </span>
          )}
        </div>

        <button className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
