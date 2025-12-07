import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reviews")({
  component: () => (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Customer Reviews
      </h1>
      <div className="bg-white rounded-2xl shadow-xl p-10">
        <p className="text-lg text-gray-600">Reviews page ready!</p>
      </div>
    </div>
  ),
});
