import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Product, Review } from "../types/productType";
import { useProducts } from "../hooks/useProducts";
import {
  fetchReviews,
  deleteProduct,
  deleteReview,
} from "../services/getdataservies";

export const Route = createFileRoute("/")({
  component: ShopPage,
});

function ShopPage() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-32 text-red-600 text-xl font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-center py-16 bg-white shadow-sm">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Shop All Products
        </h1>
        <p className="text-xl text-gray-600">Fresh kicks. Best prices.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price / 100);

  const imageUrl =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : typeof product.images === "string" && product.images
      ? product.images
      : "/placeholder.jpg";

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoadingReviews(true);
        const data = await fetchReviews(product._id);
        setReviews(data ?? []);
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };

    loadReviews();
  }, [product._id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteProduct(product._id);
      window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  const handleReviewDelete = async (reviewId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmed) return;

    try {
      await deleteReview(reviewId);

      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete review");
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="aspect-square bg-gray-100 overflow-hidden relative">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white/95 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {product.averageRating > 0 ? product.averageRating.toFixed(1) : "New"}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-xl text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm">{product.brand}</p>

        <p className="text-2xl font-bold text-green-600 mt-4">
          {formattedPrice}
        </p>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-grow">
          {product.description || "No description available."}
        </p>

        {/* Sizes */}
        <div className="mt-4 flex flex-wrap gap-2">
          {product.sizes?.slice(0, 5).map((size) => (
            <span
              key={size}
              className="text-xs bg-gray-100 px-3 py-1.5 rounded-full font-medium"
            >
              US {size}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <button className="mt-6 w-full bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition-all">
          Add to Cart
        </button>

        <button
          className="mt-2 w-full bg-red-500 text-white font-bold py-3.5 rounded-xl
                     hover:bg-red-600 transition-all disabled:opacity-60"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete Product"}
        </button>

        {/* Reviews */}
        <div className="mt-6 border-t pt-5">
          <h4 className="font-semibold text-gray-900 mb-3">Customer Reviews</h4>

          {loadingReviews ? (
            <div className="flex justify-center py-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-green-600"></div>
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {reviews.slice(0, 3).map((rev) => (
                <div
                  key={rev._id}
                  className="border border-gray-200 p-3 rounded-lg bg-gray-50 text-sm"
                >
                  <div className="flex justify-between mb-1">
                    <p className="font-semibold">{rev.userName}</p>
                    <span className="text-yellow-500 font-bold">
                      {"★".repeat(rev.rating)}
                      {"☆".repeat(5 - rev.rating)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs">{rev.review}</p>
                  <button
                    className="mt-2 text-xs text-red-600 font-medium hover:underline"
                    onClick={() => handleReviewDelete(rev._id)}
                  >
                    Delete review
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic text-center">
              No reviews yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
