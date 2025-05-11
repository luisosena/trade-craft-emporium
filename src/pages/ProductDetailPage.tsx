
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { formatCurrency, getConditionColor, getConditionLabel } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find((p) => p.id === productId);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/products")}>
          Browse All Products
        </Button>
      </div>
    );
  }
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/products" className="text-primary hover:underline">
          &larr; Back to Products
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-auto object-cover aspect-square"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={getConditionColor(product.condition)}>
              {getConditionLabel(product.condition)}
            </Badge>
            <Badge variant="secondary">{product.category}</Badge>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          
          <div className="text-2xl font-bold text-primary mb-4">
            {formatCurrency(product.price)}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="flex items-center gap-2 mb-2">
            <p className="text-gray-600">Sold by:</p>
            <Link to={`/sellers/${product.sellerId}`} className="text-primary hover:underline font-medium">
              {product.sellerName}
            </Link>
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={increaseQuantity}
              >
                <Plus size={16} />
              </Button>
            </div>
            
            <Button
              onClick={handleAddToCart}
              className="flex-1"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.properties).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping Information</AccordionTrigger>
              <AccordionContent>
                <p>Shipping rates and delivery times vary based on location and seller policies.</p>
                <p className="mt-2">Contact the seller for specific shipping details.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>Returns & Exchanges</AccordionTrigger>
              <AccordionContent>
                <p>Return policies vary by seller. Please contact the seller directly for their specific return policy.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      {/* Product Properties and Details */}
      <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
        <h2 className="text-xl font-semibold mb-4">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.properties).map(([key, value]) => (
            <div key={key} className="flex">
              <span className="font-medium w-1/3">{key}:</span>
              <span className="w-2/3">{value}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Similar Products - Placeholder for future implementation */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
        <p className="text-gray-500">Similar products will appear here.</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
