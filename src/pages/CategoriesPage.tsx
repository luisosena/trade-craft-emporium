
import React from "react";
import { Link } from "react-router-dom";
import { categories } from "@/data/categories";
import { Card, CardContent } from "@/components/ui/card";

const CategoryIcon = ({ category }: { category: string }) => {
  // Simple mapping of categories to emoji icons
  const iconMap: Record<string, string> = {
    "Electronics": "🖥️",
    "Fashion": "👕",
    "Home & Garden": "🏡",
    "Sports & Outdoors": "⚽",
    "Toys & Games": "🎮",
    "Books": "📚",
    "Health & Beauty": "💄",
    "Automotive": "🚗",
    "Jewelry": "💍",
    "Art & Collectibles": "🖼️",
  };

  return <span className="text-3xl">{iconMap[category] || "📦"}</span>;
};

const CategoriesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse by Category</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category} to={`/products?category=${category}`}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="mb-4">
                  <CategoryIcon category={category} />
                </div>
                <h3 className="text-xl font-medium">{category}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
