// src/routes/__root.tsx
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform">
                  S
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  ShopHub
                </span>
              </Link>
            </div>

            {/* Main Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                activeProps={{
                  className:
                    "text-green-600 font-semibold border-b-2 border-green-600",
                }}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors pb-1"
              >
                Shop
              </Link>
              <Link
                to="/add-item"
                activeProps={{
                  className:
                    "text-green-600 font-semibold border-b-2 border-green-600",
                }}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors pb-1"
              >
                Add Item
              </Link>
              <Link
                to="/reviews"
                activeProps={{
                  className:
                    "text-green-600 font-semibold border-b-2 border-green-600",
                }}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors pb-1"
              >
                Reviews
              </Link>
            </nav>

            {/* Right Side - Optional User/Cart */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-center py-2 border-t border-gray-100">
            <div className="flex space-x-6 text-sm">
              <Link
                to="/"
                activeProps={{ className: "text-green-600 font-bold" }}
                className="text-gray-600"
              >
                Shop
              </Link>
              <Link
                to="/add-item"
                activeProps={{ className: "text-green-600 font-bold" }}
                className="text-gray-600"
              >
                Add
              </Link>
              <Link
                to="/reviews"
                activeProps={{ className: "text-green-600 font-bold" }}
                className="text-gray-600"
              >
                Reviews
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500 text-sm">
          &copy; 2025 ShopHub.
        </div>
      </footer>

      {/* Devtools */}
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  ),
});
