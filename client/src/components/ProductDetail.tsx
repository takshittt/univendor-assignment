import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  images: string[];
  inStock: boolean;
  stockCount: number;
  brand: string;
  sku: string;
  tags: string[];
}

interface ProductDetailProps {
  addToCart: (
    product: {
      id: string;
      name: string;
      category: string;
      price: number;
      originalPrice?: number;
      image: string;
      inStock: boolean;
    },
    quantity?: number,
    selectedSize?: string
  ) => void;
}

// Extended mock data for products
const mockProducts: { [key: string]: Product } = {
  "1": {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 2847,
    description:
      "Experience premium sound quality with our state-of-the-art wireless Bluetooth headphones. Featuring advanced noise cancellation technology, these headphones deliver crystal-clear audio while blocking out unwanted ambient noise. Perfect for music lovers, professionals, and anyone who values superior audio quality.",
    features: [
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Quick charge: 15 minutes = 3 hours playback",
      "Premium leather ear cushions",
      "Multi-device connectivity",
      "Built-in voice assistant support",
      "Foldable design for portability",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32Ω",
      "Bluetooth Version": "5.0",
      "Battery Life": "30 hours (ANC off), 25 hours (ANC on)",
      "Charging Time": "2 hours",
      Weight: "250g",
      Warranty: "2 years",
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&crop=center",
    ],
    inStock: true,
    stockCount: 47,
    brand: "AudioTech",
    sku: "AT-WBH-001",
    tags: ["wireless", "bluetooth", "noise-cancelling", "premium"],
  },
  "2": {
    id: "2",
    name: "Men's Casual Shirt",
    category: "Fashion",
    price: 39.99,
    rating: 4.2,
    reviewCount: 1294,
    description:
      "Elevate your casual wardrobe with this versatile and comfortable men's shirt. Crafted from premium cotton blend fabric, this shirt offers the perfect balance of style and comfort. Whether you're heading to the office or enjoying a weekend outing, this shirt is designed to keep you looking sharp.",
    features: [
      "100% premium cotton blend",
      "Wrinkle-resistant fabric",
      "Classic fit with modern styling",
      "Button-down collar",
      "Machine washable",
      "Available in multiple colors",
      "Reinforced seams for durability",
    ],
    specifications: {
      Material: "60% Cotton, 40% Polyester",
      Fit: "Classic Fit",
      Collar: "Button-down",
      "Sleeve Length": "Long Sleeve",
      Care: "Machine wash cold",
      Origin: "Made in USA",
      "Sizes Available": "S, M, L, XL, XXL",
    },
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop&crop=center",
    ],
    inStock: true,
    stockCount: 156,
    brand: "ClassicWear",
    sku: "CW-CS-002",
    tags: ["casual", "cotton", "comfortable", "versatile"],
  },
  "3": {
    id: "3",
    name: "Smart LED Light Bulb",
    category: "Home",
    price: 24.99,
    rating: 4.8,
    reviewCount: 3521,
    description:
      "Transform your home lighting with our intelligent LED bulb that combines energy efficiency with smart technology. Control your lighting from anywhere using your smartphone, set schedules, and choose from millions of colors to create the perfect ambiance for any occasion.",
    features: [
      "16 million color options",
      "Voice control compatible (Alexa, Google)",
      "Energy efficient - 80% less energy than traditional bulbs",
      "Smartphone app control",
      "Scheduling and timer functions",
      "25,000 hour lifespan",
      "Dimming capabilities",
      "No hub required - direct WiFi connection",
    ],
    specifications: {
      Wattage: "9W (equivalent to 60W incandescent)",
      Brightness: "800 lumens",
      "Color Temperature": "2700K-6500K",
      Connectivity: "WiFi 2.4GHz",
      "Base Type": "E26/E27",
      Lifespan: "25,000 hours",
      Dimensions: '2.4" x 4.3"',
      "Operating Temperature": "-10°C to 40°C",
    },
    images: [
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=600&fit=crop&crop=center",
    ],
    inStock: true,
    stockCount: 234,
    brand: "SmartHome",
    sku: "SH-LED-003",
    tags: ["smart", "led", "energy-efficient", "voice-control"],
  },
  "4": {
    id: "4",
    name: "Organic Face Serum",
    category: "Beauty",
    price: 32.99,
    rating: 4.7,
    reviewCount: 892,
    description:
      "Rejuvenate your skin with our premium organic face serum, formulated with natural ingredients and cutting-edge skincare science. This lightweight, fast-absorbing serum delivers intense hydration while targeting signs of aging, leaving your skin looking radiant and youthful.",
    features: [
      "100% organic and natural ingredients",
      "Hyaluronic acid for deep hydration",
      "Vitamin C for brightening",
      "Anti-aging peptides",
      "Suitable for all skin types",
      "Cruelty-free and vegan",
      "Dermatologist tested",
      "Lightweight, non-greasy formula",
    ],
    specifications: {
      Volume: "30ml (1 fl oz)",
      "Key Ingredients": "Hyaluronic Acid, Vitamin C, Retinol, Peptides",
      "Skin Type": "All skin types",
      Application: "Morning and evening",
      "Shelf Life": "24 months",
      Packaging: "Dark glass bottle with dropper",
      Certifications: "USDA Organic, Cruelty-Free",
      Origin: "Made in France",
    },
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&crop=center",
    ],
    inStock: true,
    stockCount: 89,
    brand: "PureGlow",
    sku: "PG-FS-004",
    tags: ["organic", "anti-aging", "hydrating", "natural"],
  },
};

const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [primarySelectedImage, setPrimarySelectedImage] = useState(0); // Track the clicked/primary selected image
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const product = id ? mockProducts[id] : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Validate size selection for Fashion items
    if (product.category === "Fashion" && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart(
      {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        inStock: product.inStock,
      },
      quantity,
      selectedSize
    );

    // Show success message
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${quantity} ${product.name}(s)`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 hover:text-indigo-600 mr-4"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </button>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="text-lg font-bold">ShopEase</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    setPrimarySelectedImage(index);
                  }}
                  onMouseEnter={() => setSelectedImage(index)}
                  onMouseLeave={() => setSelectedImage(primarySelectedImage)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:border-indigo-400 hover:shadow-md ${
                    primarySelectedImage === index
                      ? "border-indigo-600 shadow-lg"
                      : selectedImage === index
                      ? "border-indigo-400 shadow-md"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <span>{product.brand}</span>
                <span>•</span>
                <span>SKU: {product.sku}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {product.rating}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-700 font-medium">
                    In Stock ({product.stockCount} available)
                  </span>
                </>
              ) : (
                <>
                  <div className="h-3 w-3 bg-red-400 rounded-full"></div>
                  <span className="text-red-700 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity and Size */}
            <div className="space-y-4">
              {product.category === "Fashion" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <div className="flex space-x-2">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg font-medium ${
                          selectedSize === size
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg font-medium hover:bg-indigo-50 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "description", label: "Description" },
                { id: "features", label: "Features" },
                { id: "specifications", label: "Specifications" },
                { id: "reviews", label: "Reviews" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "features" && (
              <div>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-gray-200"
                  >
                    <span className="font-medium text-gray-900">{key}</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Reviews functionality would be implemented here.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  This product has {product.reviewCount} reviews with an average
                  rating of {product.rating}/5
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
