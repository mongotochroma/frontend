import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { createProduct } from "../services/getdataservies";

export const Route = createFileRoute("/add-item")({
  component: AddItemPage,
});

function AddItemPage() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    sizes: "",
    images: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      sizes: formData.sizes.split(",").map((s) => Number(s.trim())),
    };

    try {
      console.log("Submitting product:", payload);

      await createProduct(payload);

      alert("Product added successfully!");
      setFormData({
        name: "",
        brand: "",
        price: "",
        sizes: "",
        images: "",
        description: "",
      });
    } catch (error: any) {
      console.error(error);
      alert("Failed to add product: " + (error.message || "Unknown error"));
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-10 space-y-6 border"
      >
        {/* NAME */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Product Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Nike Air Max 90"
            required
          />
        </div>

        {/* BRAND */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Brand
          </label>
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Nike"
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Price (in cents)
          </label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="12999"
            required
          />
        </div>

        {/* SIZES */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Sizes (comma separated)
          </label>
          <input
            name="sizes"
            value={formData.sizes}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="7, 8, 9, 10"
            required
          />
        </div>

        {/* IMAGE URL */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Image URL
          </label>
          <input
            name="images"
            value={formData.images}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="https://example.com/shoe.jpg"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Write product description..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all active:scale-95"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
