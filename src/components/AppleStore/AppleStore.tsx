import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  colors: string[];
  isNew?: boolean;
  description: string;
}

const AppleStore: React.FC = () => {
  const navigate = useNavigate();

  // Mock product data
  const [products] = useState<Product[]>([
    {
      id: 'iphone-15-pro',
      name: 'iPhone 15 Pro',
      category: 'iPhone',
      price: 999,
      image: '📱',
      colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
      isNew: true,
      description: 'Titanium. So strong. So light. So Pro.'
    },
    {
      id: 'macbook-air-m3',
      name: 'MacBook Air',
      category: 'Mac',
      price: 1099,
      image: '💻',
      colors: ['Midnight', 'Starlight', 'Silver', 'Space Gray'],
      isNew: true,
      description: 'Lean. Mean. M3 machine.'
    },
    {
      id: 'ipad-pro',
      name: 'iPad Pro',
      category: 'iPad',
      price: 799,
      image: '📟',
      colors: ['Silver', 'Space Gray'],
      description: 'Unbelievably thin. Incredibly powerful.'
    },
    {
      id: 'apple-watch-series-9',
      name: 'Apple Watch Series 9',
      category: 'Watch',
      price: 399,
      image: '⌚',
      colors: ['Pink', 'Midnight', 'Starlight', 'Silver', 'Red'],
      description: 'Your essential companion.'
    },
    {
      id: 'airpods-pro',
      name: 'AirPods Pro',
      category: 'AirPods',
      price: 249,
      originalPrice: 279,
      image: '🎧',
      colors: ['White'],
      description: 'Adaptive Audio. Now playing.'
    },
    {
      id: 'apple-vision-pro',
      name: 'Apple Vision Pro',
      category: 'Vision',
      price: 3499,
      image: '🥽',
      colors: ['Silver'],
      isNew: true,
      description: 'Welcome to the era of spatial computing.'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'iPhone', 'Mac', 'iPad', 'Watch', 'AirPods', 'Vision'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-neutral-800 font-semibold text-xl">
              🍎 Store
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm font-medium transition-colors ${
                    selectedCategory === category 
                      ? 'text-web-green-600' 
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-neutral-600 hover:text-neutral-900">
                🔍
              </button>
              <button className="text-neutral-600 hover:text-neutral-900">
                🛒
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Store. <span className="text-web-green-400">The best way</span> to buy the products you love.
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-3xl mx-auto">
            Discover the latest innovations. Get expert advice. And enjoy free delivery on everything.
          </p>
          <button 
            onClick={() => setSelectedCategory('iPhone')}
            className="bg-web-green-500 hover:bg-web-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
          >
            Shop iPhone
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900">
            Shop by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(1).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-200 hover:border-web-green-200"
              >
                <div className="text-4xl mb-4">
                  {category === 'iPhone' && '📱'}
                  {category === 'Mac' && '💻'}
                  {category === 'iPad' && '📟'}
                  {category === 'Watch' && '⌚'}
                  {category === 'AirPods' && '🎧'}
                  {category === 'Vision' && '🥽'}
                </div>
                <h3 className="font-semibold text-neutral-900 group-hover:text-web-green-600 transition-colors">
                  {category}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-neutral-900">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h2>
            <div className="text-sm text-neutral-600">
              {filteredProducts.length} products
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => navigate(`/store/product/${product.id}`)}
                className="group cursor-pointer bg-neutral-50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Product Badge */}
                {product.isNew && (
                  <div className="inline-block bg-web-green-500 text-white text-xs px-3 py-1 rounded-full mb-4 font-medium">
                    New
                  </div>
                )}

                {/* Product Image */}
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4">{product.image}</div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-neutral-600 mb-4">{product.description}</p>
                </div>

                {/* Color Options */}
                <div className="flex justify-center gap-2 mb-6">
                  {product.colors.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-neutral-300"
                      style={{
                        backgroundColor: 
                          color.includes('Silver') ? '#C0C0C0' :
                          color.includes('Gold') ? '#FFD700' :
                          color.includes('Black') || color.includes('Midnight') ? '#000000' :
                          color.includes('White') || color.includes('Starlight') ? '#FFFFFF' :
                          color.includes('Blue') ? '#0066CC' :
                          color.includes('Red') ? '#FF0000' :
                          color.includes('Pink') ? '#FFB6C1' :
                          color.includes('Green') ? '#00A950' :
                          '#666666'
                      }}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-xs text-neutral-500 self-center ml-1">
                      +{product.colors.length - 4}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    {product.originalPrice && (
                      <span className="text-neutral-500 line-through text-lg">
                        ${product.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-neutral-900">
                      ${product.price}
                    </span>
                  </div>
                  
                  <button className="mt-4 bg-web-green-500 hover:bg-web-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4">Shop and Learn</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><Link to="/store" className="hover:text-neutral-900">Store</Link></li>
                <li><Link to="/" className="hover:text-neutral-900">Mac</Link></li>
                <li><Link to="/" className="hover:text-neutral-900">iPad</Link></li>
                <li><Link to="/" className="hover:text-neutral-900">iPhone</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><Link to="/paywise" className="hover:text-neutral-900">Apple Pay</Link></li>
                <li><Link to="/" className="hover:text-neutral-900">AppleCare</Link></li>
                <li><Link to="/" className="hover:text-neutral-900">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4">Account</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><Link to="/" className="hover:text-neutral-900">Manage Your Apple ID</Link></li>
                <li><Link to="/" className="hover:text-neutral-900">Order Status</Link></li>
                <li><Link to="/" className="hover:text-neutral-900">Shopping Bag</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4">Apple Store</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><Link to="/" className="hover:text-neutral-900">Find a Store</Link></li>
                <li><Link to="/" className="hover:text-neutral-900">Genius Bar</Link></li>
                <li><Link to="/" className="hover:text-neutral-900">Today at Apple</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-300 mt-12 pt-8 text-center">
            <Link to="/" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppleStore;