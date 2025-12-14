import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createReview, fetchProducts } from "../services/getdataservies";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
});

function ReviewsPage() {
  interface Product {
    _id: string;
    name: string;
  }

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    shoeId: "",
    userName: "",
    rating: 0,
    review: "",
  });

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createReview(formData);

      setFormData({
        shoeId: formData.shoeId,
        userName: "",
        rating: 0,
        review: "",
      });
    } catch (error) {
      console.error("Review submit failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Add a Review</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-10 space-y-8"
      >
        {/* username */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            name="UserName"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-xl"
            required
          />
        </div>

        {/* PRODUCT SELECT */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Select Product
          </label>

          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : (
            <select
              name="productId"
              value={formData.shoeId}
              onChange={(e) =>
                setFormData({ ...formData, shoeId: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl"
              required
            >
              <option value="">Choose product…</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* RATING */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Rating (1–5)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setFormData({ ...formData, rating: num })}
                className={`px-4 py-2 rounded-xl border 
                  ${formData.rating >= num ? "bg-yellow-400" : "bg-gray-100"}`}
              >
                ⭐ {num}
              </button>
            ))}
          </div>
        </div>

        {/* REVIEW TEXT */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Review Message
          </label>
          <textarea
            name="review"
            value={formData.review}
            onChange={(e) =>
              setFormData({ ...formData, review: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Write your honest review…"
            required
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all active:scale-95"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
