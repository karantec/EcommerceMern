import React from "react";
import { Star } from "lucide-react";

export default function BestSellingProducts() {
  const products = [
    {
      id: 1,
      name: "Black Pepper",
      brand: "Organic",
      price: "₹299",
      image:
        "https://images.unsplash.com/photo-1596040033229-a0b3b4e5e4e6?w=300&h=300&fit=crop",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Saffron Strands",
      brand: "Premium",
      price: "₹899",
      image:
        "https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=300&h=300&fit=crop",
      rating: 5,
    },
    {
      id: 3,
      name: "Turmeric Powder",
      brand: "Organic",
      price: "₹199",
      image:
        "https://images.unsplash.com/photo-1615485500834-bc10199bc768?w=300&h=300&fit=crop",
      rating: 4,
    },
    {
      id: 4,
      name: "Chili Powder",
      brand: "Organic",
      price: "₹249",
      image:
        "https://images.unsplash.com/photo-1583380916472-7e51f7c7e8dc?w=300&h=300&fit=crop",
      rating: 4.5,
    },
    {
      id: 5,
      name: "Kashmiri Chilli",
      brand: "Premium",
      price: "₹349",
      image:
        "https://images.unsplash.com/photo-1612093687321-753c55ab0e6a?w=300&h=300&fit=crop",
      rating: 4.5,
    },
    {
      id: 6,
      name: "Shilajit",
      brand: "Pure",
      price: "₹1299",
      image:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=300&fit=crop",
      rating: 5,
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Best Selling Products
          </h2>
          <div className="flex justify-center">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='20' viewBox='0 0 100 20'%3E%3Cpath d='M10 5 L15 15 L20 5' fill='none' stroke='%2384cc16' stroke-width='2'/%3E%3Cpath d='M30 5 L35 15 L40 5' fill='none' stroke='%2384cc16' stroke-width='2'/%3E%3Cpath d='M50 5 L55 15 L60 5' fill='none' stroke='%2384cc16' stroke-width='2'/%3E%3Cpath d='M70 5 L75 15 L80 5' fill='none' stroke='%2384cc16' stroke-width='2'/%3E%3C/svg%3E"
              alt="decorative line"
              className="h-6"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Price */}
                <p className="text-xl font-bold text-gray-800 mb-4">
                  {product.price}
                </p>

                {/* Add to Cart Button */}
                <button className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200">
            View More Products
          </button>
        </div>
      </div>
    </div>
  );
}
