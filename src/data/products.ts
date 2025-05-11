
import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    description: "Genuine leather jacket in excellent condition. Perfect for fall weather.",
    price: 89.99,
    condition: "good",
    category: "Fashion",
    sellerId: "seller1",
    sellerName: "Vintage Finds",
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3"],
    properties: {
      "Size": "Medium",
      "Color": "Brown",
      "Material": "Genuine Leather",
      "Brand": "Levi's",
      "Year": "1980s"
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Mechanical Keyboard",
    description: "High-quality mechanical keyboard with RGB lighting and Cherry MX switches.",
    price: 129.99,
    condition: "like_new",
    category: "Electronics",
    sellerId: "seller2",
    sellerName: "Tech Gear",
    images: ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3"],
    properties: {
      "Switch Type": "Cherry MX Brown",
      "Layout": "Full Size",
      "Backlight": "RGB",
      "Connectivity": "USB-C",
      "Brand": "Ducky"
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Ceramic Planter Set",
    description: "Set of 3 handmade ceramic planters. Perfect for succulents and small plants.",
    price: 45.99,
    condition: "new",
    category: "Home & Garden",
    sellerId: "seller3",
    sellerName: "Green Thumb",
    images: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3"],
    properties: {
      "Material": "Ceramic",
      "Size": "Small, Medium, Large",
      "Color": "White",
      "Drainage Holes": "Yes",
      "Handmade": "Yes"
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Mountain Bike",
    description: "Sturdy mountain bike with 27-speed shifter and hydraulic brakes.",
    price: 349.99,
    condition: "good",
    category: "Sports & Outdoors",
    sellerId: "seller4",
    sellerName: "Outdoor Adventures",
    images: ["https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3"],
    properties: {
      "Frame": "Aluminum",
      "Wheel Size": "27.5\"",
      "Speeds": "27",
      "Brake Type": "Hydraulic Disc",
      "Suspension": "Front",
      "Brand": "Trek"
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "Vintage Record Player",
    description: "Beautiful vintage record player from the 1970s in working condition.",
    price: 179.99,
    condition: "fair",
    category: "Electronics",
    sellerId: "seller1",
    sellerName: "Vintage Finds",
    images: ["https://images.unsplash.com/photo-1542208998-f6dbbb22d989?ixlib=rb-4.0.3"],
    properties: {
      "Era": "1970s",
      "Brand": "Sony",
      "Working Condition": "Yes",
      "Connectivity": "RCA",
      "Includes": "2 speakers",
      "Color": "Wood grain"
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "6",
    title: "Designer Watch",
    description: "Elegant designer watch with leather band and stainless steel case.",
    price: 225.00,
    condition: "like_new",
    category: "Jewelry",
    sellerId: "seller5",
    sellerName: "Luxe Accessories",
    images: ["https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3"],
    properties: {
      "Brand": "Fossil",
      "Material": "Stainless Steel",
      "Band": "Genuine Leather",
      "Movement": "Automatic",
      "Water Resistant": "Yes",
      "Color": "Black/Silver"
    },
    createdAt: new Date().toISOString()
  }
];
