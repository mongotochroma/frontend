import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { fetchProducts } from "../services/getdataservies";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
});

function ReviewsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    productId: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Review Submitted:", formData);

    // await createReview(formData)
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Add a Review</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-10 space-y-8"
      >
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
              value={formData.productId}
              onChange={(e) =>
                setFormData({ ...formData, productId: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl"
              required
            >
              <option value="">Choose product…</option>
              {products.map((p: any) => (
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
