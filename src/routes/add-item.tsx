import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/add-item')({
  component: () => (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Add New Item</h1>
      <div className="bg-white rounded-2xl shadow-xl p-10">
        <p className="text-lg text-gray-600">Form coming in the next step!</p>
      </div>
    </div>
  ),
})