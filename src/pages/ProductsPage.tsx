
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all", // Changed default from "" to "all"
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    condition: {
      new: false,
      like_new: false,
      good: false,
      fair: false,
      poor: false,
    },
    sort: searchParams.get("sort") || "newest",
  });

  // Update the condition filters from URL params
  useEffect(() => {
    const conditionParam = searchParams.get("condition");
    if (conditionParam) {
      const conditionValues = conditionParam.split(",");
      const newConditionState = {
        new: conditionValues.includes("new"),
        like_new: conditionValues.includes("like_new"),
        good: conditionValues.includes("good"),
        fair: conditionValues.includes("fair"),
        poor: conditionValues.includes("poor"),
      };
      setFilters(prev => ({ ...prev, condition: newConditionState }));
    }
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        p => 
          p.title.toLowerCase().includes(searchTerm) || 
          p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply category filter - modified to handle "all" value
    if (filters.category && filters.category !== "all") {
      result = result.filter(p => p.category === filters.category);
    }
    
    // Apply price filters
    if (filters.minPrice) {
      result = result.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= parseFloat(filters.maxPrice));
    }
    
    // Apply condition filters
    const activeConditions = Object.entries(filters.condition)
      .filter(([_, isSelected]) => isSelected)
      .map(([condition]) => condition);
    
    if (activeConditions.length > 0) {
      result = result.filter(p => activeConditions.includes(p.condition));
    }
    
    // Apply sorting
    switch (filters.sort) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result.sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [filters]);

  const applyFilters = () => {
    const newParams = new URLSearchParams();
    
    if (filters.search) newParams.set("search", filters.search);
    if (filters.category && filters.category !== "all") newParams.set("category", filters.category);
    if (filters.minPrice) newParams.set("minPrice", filters.minPrice);
    if (filters.maxPrice) newParams.set("maxPrice", filters.maxPrice);
    if (filters.sort) newParams.set("sort", filters.sort);
    
    const activeConditions = Object.entries(filters.condition)
      .filter(([_, isSelected]) => isSelected)
      .map(([condition]) => condition);
    
    if (activeConditions.length > 0) {
      newParams.set("condition", activeConditions.join(","));
    }
    
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "all",  // Changed from "" to "all"
      minPrice: "",
      maxPrice: "",
      condition: {
        new: false,
        like_new: false,
        good: false,
        fair: false,
        poor: false,
      },
      sort: "newest",
    });
    setSearchParams({});
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      condition: {
        ...prev.condition,
        [condition]: checked,
      },
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Products</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="md:w-1/4 space-y-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            {/* Search field */}
            <div className="mb-4">
              <Label htmlFor="search" className="mb-1 block">Search</Label>
              <Input
                id="search"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full"
              />
            </div>
            
            {/* Category filter */}
            <div className="mb-4">
              <Label htmlFor="category" className="mb-1 block">Category</Label>
              <Select
                value={filters.category}
                onValueChange={(value) => setFilters({...filters, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Price range */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Min"
                  type="number"
                  min="0"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
                <span>to</span>
                <Input
                  placeholder="Max"
                  type="number"
                  min="0"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
            </div>
            
            {/* Condition checkboxes */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Condition</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="condition-new"
                    checked={filters.condition.new}
                    onCheckedChange={(checked) => handleConditionChange("new", checked === true)}
                  />
                  <Label htmlFor="condition-new" className="ml-2">New</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="condition-like_new"
                    checked={filters.condition.like_new}
                    onCheckedChange={(checked) => handleConditionChange("like_new", checked === true)}
                  />
                  <Label htmlFor="condition-like_new" className="ml-2">Like New</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="condition-good"
                    checked={filters.condition.good}
                    onCheckedChange={(checked) => handleConditionChange("good", checked === true)}
                  />
                  <Label htmlFor="condition-good" className="ml-2">Good</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="condition-fair"
                    checked={filters.condition.fair}
                    onCheckedChange={(checked) => handleConditionChange("fair", checked === true)}
                  />
                  <Label htmlFor="condition-fair" className="ml-2">Fair</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="condition-poor"
                    checked={filters.condition.poor}
                    onCheckedChange={(checked) => handleConditionChange("poor", checked === true)}
                  />
                  <Label htmlFor="condition-poor" className="ml-2">Poor</Label>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
              <Button onClick={clearFilters} variant="outline" className="flex-1">Clear</Button>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="md:w-3/4">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">{filteredProducts.length} products found</p>
            <div className="flex items-center">
              <Label htmlFor="sort" className="mr-2">Sort by:</Label>
              <Select
                value={filters.sort}
                onValueChange={(value) => {
                  setFilters({...filters, sort: value});
                  searchParams.set("sort", value);
                  setSearchParams(searchParams);
                }}
              >
                <SelectTrigger id="sort" className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg p-8 shadow-sm border text-center">
              <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
