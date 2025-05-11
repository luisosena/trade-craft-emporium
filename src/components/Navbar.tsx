
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, Package, Search, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="border-b sticky top-0 z-10 bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-primary">
            TradeCraft Emporium
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <Link to="/products" className="hover:text-primary">
              Browse
            </Link>
            <Link to="/categories" className="hover:text-primary">
              Categories
            </Link>
            {user?.isSeller && (
              <Link to="/seller/dashboard" className="hover:text-primary">
                Seller Dashboard
              </Link>
            )}
          </div>

          {/* Search for desktop */}
          <div className="hidden md:block max-w-xs w-full mx-4">
            <form onSubmit={handleSearch} className="flex">
              <Input 
                type="search" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none"
              />
              <Button type="submit" variant="secondary" className="rounded-l-none">
                <Search size={18} />
              </Button>
            </form>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/account">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User size={18} /> 
                    {user.name.split(' ')[0]}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
            <Link to="/cart" className="relative">
              <Button variant="outline" size="icon">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-secondary text-white min-w-[20px] h-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="outline" size="icon">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-secondary text-white min-w-[20px] h-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1"
            >
              {mobileMenuOpen ? <X size={24} /> : (
                <div className="flex flex-col gap-1">
                  <div className="w-5 h-0.5 bg-current"></div>
                  <div className="w-5 h-0.5 bg-current"></div>
                  <div className="w-5 h-0.5 bg-current"></div>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex mb-4">
              <Input 
                type="search" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none"
              />
              <Button type="submit" variant="secondary" className="rounded-l-none">
                <Search size={18} />
              </Button>
            </form>
            
            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-3">
              <Link 
                to="/products" 
                className="hover:text-primary py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse
              </Link>
              <Link 
                to="/categories" 
                className="hover:text-primary py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              {user?.isSeller && (
                <Link 
                  to="/seller/dashboard" 
                  className="hover:text-primary py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Seller Dashboard
                </Link>
              )}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-2 border-t">
                {user ? (
                  <div className="flex flex-col space-y-3">
                    <Link 
                      to="/account" 
                      className="flex items-center gap-2 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User size={18} />
                      {user.name}
                    </Link>
                    <Button variant="ghost" onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link 
                      to="/login" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full">Register</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
