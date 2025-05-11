
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, Trash, ShoppingCart, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in or register to complete your purchase",
        variant: "destructive",
      });
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    
    // In a real app, this would navigate to a checkout page or process
    toast({
      title: "Order Placed!",
      description: `Thank you for your purchase of ${totalItems} item(s) totaling ${formatCurrency(totalPrice)}`,
    });
    clearCart();
    navigate("/");
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg p-8 shadow-sm border text-center">
          <div className="mb-4 flex justify-center">
            <ShoppingCart size={64} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Browse our products and find something you love!
          </p>
          <Link to="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* Headers for desktop */}
            <div className="hidden md:grid grid-cols-12 p-4 bg-gray-50 text-sm font-medium text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {/* Cart items */}
            <div className="divide-y">
              {cart.map((item) => (
                <div key={item.productId} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Product info */}
                    <div className="md:col-span-6 flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 overflow-hidden rounded">
                        <img
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Link to={`/products/${item.productId}`} className="font-medium hover:text-primary">
                          {item.product.title}
                        </Link>
                        <div className="text-sm text-gray-500">
                          Sold by {item.product.sellerName}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 mt-1 md:hidden"
                        >
                          <Trash size={14} /> Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                      <span className="md:hidden text-gray-500">Price:</span>
                      <span>{formatCurrency(item.product.price)}</span>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                      <span className="md:hidden text-gray-500">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                      <span className="md:hidden text-gray-500">Total:</span>
                      <span className="font-medium">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hidden md:flex"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <Trash size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cart Actions */}
          <div className="mt-4 flex justify-between items-center">
            <Button variant="outline" onClick={() => navigate("/products")}>
              Continue Shopping
            </Button>
            <Button variant="outline" className="text-red-500 hover:text-red-700" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            
            <Button className="w-full" size="lg" onClick={handleCheckout}>
              Checkout <ArrowRight size={16} className="ml-2" />
            </Button>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              Secure checkout powered by our payment processor
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
