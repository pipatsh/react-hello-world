import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

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
  features: string[];
  specs: Record<string, string>;
  gallery: string[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock detailed product data
  const productData: Record<string, Product> = {
    'iphone-15-pro': {
      id: 'iphone-15-pro',
      name: 'iPhone 15 Pro',
      category: 'iPhone',
      price: 999,
      image: '📱',
      colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
      isNew: true,
      description: 'iPhone 15 Pro. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action Button, and the most powerful iPhone camera system ever.',
      features: [
        'Titanium with textured matte glass back',
        'A17 Pro chip with 6-core GPU',
        'Pro camera system: Main, Ultra Wide, Telephoto',
        'Action Button for quick actions',
        'USB-C connector',
        'Face ID facial recognition'
      ],
      specs: {
        'Display': '6.1-inch Super Retina XDR display',
        'Chip': 'A17 Pro chip',
        'Camera': 'Pro camera system (48MP Main, 12MP Ultra Wide, 12MP Telephoto)',
        'Video': '4K Dolby Vision up to 60 fps',
        'Battery': 'Up to 23 hours video playback',
        'Storage': '128GB, 256GB, 512GB, 1TB'
      },
      gallery: ['📱', '📷', '🔋', '💻']
    },
    'macbook-air-m3': {
      id: 'macbook-air-m3',
      name: 'MacBook Air',
      category: 'Mac',
      price: 1099,
      image: '💻',
      colors: ['Midnight', 'Starlight', 'Silver', 'Space Gray'],
      isNew: true,
      description: 'The new MacBook Air with M3 chip brings serious performance to the world\'s most popular laptop. With an all-day battery life and a fanless design, it\'s more capable than ever.',
      features: [
        'Apple M3 chip with 8-core CPU',
        '13.6-inch Liquid Retina display',
        '1080p FaceTime HD camera',
        'MagSafe 3 charging port',
        'Two Thunderbolt ports',
        'Up to 18 hours battery life'
      ],
      specs: {
        'Display': '13.6-inch Liquid Retina display',
        'Chip': 'Apple M3 with 8-core CPU, up to 10-core GPU',
        'Memory': '8GB or 16GB unified memory',
        'Storage': '256GB, 512GB, 1TB, 2TB SSD',
        'Battery': 'Up to 18 hours Apple TV app movie playback',
        'Weight': '2.7 pounds (1.24 kg)'
      },
      gallery: ['💻', '⌨️', '🔋', '📺']
    }
  };

  const product = id ? productData[id] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Product Not Found</h2>
          <Link 
            to="/store"
            className="bg-web-green-500 hover:bg-web-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Mock add to cart functionality
    alert(`Added ${product.name} in ${product.colors[selectedColor]} to cart!`);
  };

  const handleBuyNow = () => {
    // Navigate to PayWise for payment
    navigate('/paywise', { 
      state: { 
        purchaseItem: {
          name: product.name,
          price: product.price,
          color: product.colors[selectedColor]
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/store" className="text-neutral-600 hover:text-neutral-900">
              ← Store
            </Link>
            <h1 className="font-semibold text-neutral-900">{product.name}</h1>
            <button className="text-neutral-600 hover:text-neutral-900">
              🛒
            </button>
          </div>
        </div>
      </nav>

      {/* Product Hero */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Product Images */}
            <div className="space-y-8">
              <div className="text-center">
                <div className="text-9xl mb-8">{product.gallery[0]}</div>
                <div className="flex justify-center gap-4">
                  {product.gallery.map((img, index) => (
                    <button
                      key={index}
                      className="w-16 h-16 border-2 border-neutral-200 rounded-xl flex items-center justify-center text-2xl hover:border-web-green-300 transition-colors"
                    >
                      {img}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {product.isNew && (
                <div className="inline-block bg-web-green-500 text-white text-sm px-4 py-2 rounded-full font-medium">
                  New
                </div>
              )}

              <div>
                <h1 className="text-5xl font-bold text-neutral-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="text-3xl font-bold text-neutral-900">
                From ${product.price}
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Color - {product.colors[selectedColor]}
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        selectedColor === index 
                          ? 'border-web-green-500 scale-110' 
                          : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                      style={{
                        backgroundColor: 
                          color.includes('Silver') ? '#C0C0C0' :
                          color.includes('Gold') ? '#FFD700' :
                          color.includes('Black') || color.includes('Midnight') ? '#000000' :
                          color.includes('White') || color.includes('Starlight') ? '#FFFFFF' :
                          color.includes('Blue') ? '#0066CC' :
                          color.includes('Natural') ? '#E8E8E8' :
                          '#666666'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button 
                  onClick={handleBuyNow}
                  className="w-full bg-web-green-500 hover:bg-web-green-600 text-white py-4 rounded-full text-lg font-semibold transition-colors"
                >
                  Buy Now
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="w-full border-2 border-web-green-500 text-web-green-600 hover:bg-web-green-50 py-4 rounded-full text-lg font-semibold transition-colors"
                >
                  Add to Bag
                </button>
              </div>

              {/* Delivery Info */}
              <div className="bg-neutral-50 rounded-2xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-3">Delivery</h3>
                <p className="text-neutral-600 mb-2">📦 Free delivery</p>
                <p className="text-neutral-600">🚚 Get it by Thu, Jun 22</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex border-b border-neutral-200 mb-8">
            {['overview', 'specs', 'support'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  selectedTab === tab
                    ? 'border-web-green-500 text-web-green-600'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-web-green-500 rounded-full mt-2"></div>
                      <p className="text-neutral-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'specs' && (
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Technical Specifications</h2>
              <div className="bg-white rounded-2xl p-6">
                <dl className="space-y-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-neutral-100 last:border-b-0">
                      <dt className="font-semibold text-neutral-900 mb-1 sm:mb-0">{key}</dt>
                      <dd className="text-neutral-600 sm:text-right sm:max-w-md">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          {selectedTab === 'support' && (
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="font-semibold text-neutral-900 mb-3">📞 Technical Support</h3>
                  <p className="text-neutral-600 mb-4">Get help with your {product.name}</p>
                  <button className="text-web-green-600 hover:text-web-green-700 font-medium">
                    Contact Support →
                  </button>
                </div>
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="font-semibold text-neutral-900 mb-3">🛡️ AppleCare+</h3>
                  <p className="text-neutral-600 mb-4">Extended warranty and support</p>
                  <button className="text-web-green-600 hover:text-web-green-700 font-medium">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900">
            You might also like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(productData)
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 3)
              .map(relatedProduct => (
                <div
                  key={relatedProduct.id}
                  onClick={() => navigate(`/store/product/${relatedProduct.id}`)}
                  className="cursor-pointer bg-neutral-50 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">{relatedProduct.image}</div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-semibold text-neutral-700">
                      ${relatedProduct.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;