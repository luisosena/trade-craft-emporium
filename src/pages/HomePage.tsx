
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const HomePage = () => {
  // Get featured products (for this demo, just take the first 3)
  const featuredProducts = products.slice(0, 3);
  const [isLoading, setIsLoading] = useState(true);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  
  // Choose featured categories
  const featuredCategories = categories.slice(0, 6);

  // Simulate loading time for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Buy and Sell Unique Products with Ease
            </h1>
            <p className="text-lg mb-6">
              Join our marketplace to discover one-of-a-kind items from sellers 
              around the world or start your own shop today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Shopping
                </Button>
              </Link>
              <Link to="/sell">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Become a Seller
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center relative">
            {!heroImageLoaded && (
              <div className="rounded-lg bg-gray-200 w-full h-64 md:h-80 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img 
              src="https://images.unsplash.com/photo-1562280963-8a5475740f9d?ixlib=rb-4.0.3" 
              alt="TradeCraft Marketplace" 
              className={`rounded-lg shadow-lg max-w-full h-auto transition-opacity duration-300 ${heroImageLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
              loading="eager" // Load hero image eagerly as it's above the fold
              onLoad={() => setHeroImageLoaded(true)}
            />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Popular Categories</h2>
            <Link to="/categories" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCategories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition-colors"
              >
                <div className="text-lg font-medium">{category}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Show skeletons while loading
              Array(3).fill(0).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              // Show actual product cards when loaded
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Seller CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join thousands of sellers who have found success on our platform.
            It's quick, easy, and free to get started!
          </p>
          <Link to="/sell">
            <Button size="lg" variant="secondary">
              Open Your Shop Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials/Trust */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Why People Love Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
              </div>
              <p className="italic mb-4">
                "I've found the most unique items here that I couldn't find anywhere else. The seller was responsive and shipping was fast!"
              </p>
              <p className="font-medium">- Sarah T., Buyer</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
              </div>
              <p className="italic mb-4">
                "As a seller, I've been able to connect with customers worldwide. The platform is intuitive and makes managing my products simple."
              </p>
              <p className="font-medium">- Mike R., Seller</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
              </div>
              <p className="italic mb-4">
                "The detailed product descriptions and condition information helped me make confident purchases. Great marketplace!"
              </p>
              <p className="font-medium">- Lisa M., Buyer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
