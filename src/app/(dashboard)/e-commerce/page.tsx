import Image from "next/image";
import { Filter, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "Premium Urea Fertilizer (50kg)",
    category: "Fertilizers",
    price: "₹266.50",
    rating: 4.8,
    reviews: 124,
    image: "/images/fertilizer.png",
    stock: "In Stock"
  },
  {
    id: 2,
    name: "High-Yield Wheat Seeds (10kg)",
    category: "Seeds",
    price: "₹450.00",
    rating: 4.9,
    reviews: 89,
    image: "/images/ecommerce_seed.png",
    stock: "In Stock"
  },
  {
    id: 3,
    name: "Organic Neem Pesticide (1L)",
    category: "Pesticides",
    price: "₹320.00",
    rating: 4.5,
    reviews: 45,
    image: "/images/pesticide.png",
    stock: "Low Stock"
  },
  {
    id: 4,
    name: "Drip Irrigation Kit (1 Acre)",
    category: "Equipment",
    price: "₹12,500.00",
    rating: 4.7,
    reviews: 210,
    image: "/images/drip.png",
    stock: "In Stock"
  }
];

export default function ECommercePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-black">Agri Marketplace</h1>
          <p className="text-muted-foreground mt-1 text-black">
            Buy certified seeds, fertilizers, and equipment directly from trusted sellers.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-background">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <ShoppingCart className="mr-2 h-4 w-4" />
            View Cart (0)
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden flex flex-col bg-background/50 backdrop-blur-sm border-border/50 transition-all hover:shadow-md">
            <div className="relative aspect-square w-full">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-white text-black hover:bg-zinc-200">
                {product.category}
              </Badge>
              {product.stock === "Low Stock" && (
                <Badge variant="destructive" className="absolute top-3 right-3 bg-red-500">
                  {product.stock}
                </Badge>
              )}
            </div>
            <CardContent className="p-4 flex-1">
              <h3 className="font-semibold text-lg line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
              <div className="flex items-center gap-1 mt-2 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium text-black">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews})</span>
              </div>
              <div className="mt-4 text-xl font-bold text-primary">{product.price}</div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
