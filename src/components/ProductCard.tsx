
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const conditionColors = {
  new: "bg-green-100 text-green-800",
  like_new: "bg-blue-100 text-blue-800",
  good: "bg-yellow-100 text-yellow-800",
  fair: "bg-orange-100 text-orange-800",
  poor: "bg-red-100 text-red-800",
};

const conditionLabels = {
  new: "New",
  like_new: "Like New",
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
      <Link to={`/products/${product.id}`} className="overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className={`${conditionColors[product.condition]}`}>
            {conditionLabels[product.condition]}
          </Badge>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-xl font-bold mb-2 text-primary">
          {formatCurrency(product.price)}
        </p>
        <p className="text-gray-500 text-sm mb-2">
          Sold by {product.sellerName}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product, 1);
          }}
          className="w-full"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
