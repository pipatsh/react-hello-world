import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface iPhoneModel {
  id: string;
  name: string;
  displayName: string;
  startingPrice: number;
  image: string;
  colors: { name: string; hex: string; }[];
  storageOptions: { size: string; price: number; }[];
  features: string[];
  displaySize: string;
  chip: string;
  camera: string;
}

interface SelectedConfig {
  model: string;
  color: string;
  storage: string;
  totalPrice: number;
}

const ShopIPhone: React.FC = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1); // 1: Model, 2: Color, 3: Storage, 4: Summary
  const [selectedConfig, setSelectedConfig] = useState<SelectedConfig>({
    model: '',
    color: '',
    storage: '',
    totalPrice: 0
  });

  const iPhoneModels: iPhoneModel[] = [
    {
      id: 'iphone-15-pro-max',
      name: 'iPhone 15 Pro Max',
      displayName: 'iPhone 15 Pro Max',
      startingPrice: 1199,
      image: '📱',
      displaySize: '6.7"',
      chip: 'A17 Pro',
      camera: 'Pro camera system',
      colors: [
        { name: 'Natural Titanium', hex: '#F5F5DC' },
        { name: 'Blue Titanium', hex: '#4A90E2' },
        { name: 'White Titanium', hex: '#F8F8FF' },
        { name: 'Black Titanium', hex: '#2C2C2C' }
      ],
      storageOptions: [
        { size: '256GB', price: 1199 },
        { size: '512GB', price: 1399 },
        { size: '1TB', price: 1599 }
      ],
      features: [
        'Titanium with textured matte glass back',
        'A17 Pro chip with 6-core GPU',
        'Pro camera system with 5x Telephoto',
        'Action Button',
        'USB-C'
      ]
    },
    {
      id: 'iphone-15-pro',
      name: 'iPhone 15 Pro',
      displayName: 'iPhone 15 Pro',
      startingPrice: 999,
      image: '📱',
      displaySize: '6.1"',
      chip: 'A17 Pro',
      camera: 'Pro camera system',
      colors: [
        { name: 'Natural Titanium', hex: '#F5F5DC' },
        { name: 'Blue Titanium', hex: '#4A90E2' },
        { name: 'White Titanium', hex: '#F8F8FF' },
        { name: 'Black Titanium', hex: '#2C2C2C' }
      ],
      storageOptions: [
        { size: '128GB', price: 999 },
        { size: '256GB', price: 1099 },
        { size: '512GB', price: 1299 },
        { size: '1TB', price: 1499 }
      ],
      features: [
        'Titanium with textured matte glass back',
        'A17 Pro chip with 6-core GPU',
        'Pro camera system with 3x Telephoto',
        'Action Button',
        'USB-C'
      ]
    },
    {
      id: 'iphone-15-plus',
      name: 'iPhone 15 Plus',
      displayName: 'iPhone 15 Plus',
      startingPrice: 899,
      image: '📱',
      displaySize: '6.7"',
      chip: 'A16 Bionic',
      camera: 'Advanced dual-camera system',
      colors: [
        { name: 'Pink', hex: '#FFB6C1' },
        { name: 'Yellow', hex: '#FFD700' },
        { name: 'Green', hex: '#90EE90' },
        { name: 'Blue', hex: '#87CEEB' },
        { name: 'Black', hex: '#000000' }
      ],
      storageOptions: [
        { size: '128GB', price: 899 },
        { size: '256GB', price: 999 },
        { size: '512GB', price: 1199 }
      ],
      features: [
        'Color-infused glass and aluminum design',
        'A16 Bionic chip',
        'Advanced dual-camera system',
        'Dynamic Island',
        'USB-C'
      ]
    },
    {
      id: 'iphone-15',
      name: 'iPhone 15',
      displayName: 'iPhone 15',
      startingPrice: 799,
      image: '📱',
      displaySize: '6.1"',
      chip: 'A16 Bionic',
      camera: 'Advanced dual-camera system',
      colors: [
        { name: 'Pink', hex: '#FFB6C1' },
        { name: 'Yellow', hex: '#FFD700' },
        { name: 'Green', hex: '#90EE90' },
        { name: 'Blue', hex: '#87CEEB' },
        { name: 'Black', hex: '#000000' }
      ],
      storageOptions: [
        { size: '128GB', price: 799 },
        { size: '256GB', price: 899 },
        { size: '512GB', price: 1099 }
      ],
      features: [
        'Color-infused glass and aluminum design',
        'A16 Bionic chip',
        'Advanced dual-camera system',
        'Dynamic Island',
        'USB-C'
      ]
    }
  ];

  const getSelectedModel = () => {
    return iPhoneModels.find(model => model.id === selectedConfig.model);
  };

  const getSelectedStorage = () => {
    const model = getSelectedModel();
    return model?.storageOptions.find(storage => storage.size === selectedConfig.storage);
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedConfig(prev => ({
      ...prev,
      model: modelId,
      color: '',
      storage: '',
      totalPrice: 0
    }));
    setStep(2);
  };

  const handleColorSelect = (colorName: string) => {
    setSelectedConfig(prev => ({
      ...prev,
      color: colorName
    }));
    setStep(3);
  };

  const handleStorageSelect = (storageSize: string, price: number) => {
    setSelectedConfig(prev => ({
      ...prev,
      storage: storageSize,
      totalPrice: price
    }));
    setStep(4);
  };

  const handleAddToBag = () => {
    const model = getSelectedModel();
    if (model) {
      navigate('/paywise', {
        state: {
          purchaseItem: {
            name: `${model.name} ${selectedConfig.storage}`,
            price: selectedConfig.totalPrice,
            color: selectedConfig.color,
            storage: selectedConfig.storage
          }
        }
      });
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
            stepNum <= step 
              ? 'bg-web-green-500 text-white' 
              : stepNum === step + 1 && step < 4
                ? 'bg-neutral-200 text-neutral-600'
                : 'bg-neutral-100 text-neutral-400'
          }`}>
            {stepNum}
          </div>
          {stepNum < 4 && (
            <div className={`w-12 h-0.5 transition-colors ${
              stepNum < step ? 'bg-web-green-500' : 'bg-neutral-200'
            }`}></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderModelSelection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-neutral-900 mb-4">Buy iPhone</h1>
        <p className="text-xl text-neutral-600">Choose your iPhone model</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {iPhoneModels.map((model) => (
          <div
            key={model.id}
            onClick={() => handleModelSelect(model.id)}
            className="cursor-pointer bg-white rounded-3xl p-8 border border-neutral-200 hover:border-web-green-300 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">{model.image}</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{model.displayName}</h3>
              <p className="text-neutral-600 text-sm mb-4">{model.displaySize} display</p>
              
              <div className="space-y-2 mb-6">
                <div className="text-sm text-neutral-600">{model.chip}</div>
                <div className="text-sm text-neutral-600">{model.camera}</div>
              </div>

              <div className="flex justify-center gap-1 mb-4">
                {model.colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-neutral-300"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>

              <div className="text-lg font-semibold text-neutral-900 mb-4">
                From ${model.startingPrice}
              </div>

              <button className="w-full bg-web-green-500 text-white py-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderColorSelection = () => {
    const model = getSelectedModel();
    if (!model) return null;

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">{model.displayName}</h1>
          <p className="text-xl text-neutral-600">Choose your finish</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{model.image}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {model.colors.map((color) => (
              <div
                key={color.name}
                onClick={() => handleColorSelect(color.name)}
                className="cursor-pointer bg-white rounded-2xl p-6 border border-neutral-200 hover:border-web-green-300 hover:shadow-md transition-all duration-300 group"
              >
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-neutral-200 group-hover:border-web-green-300 transition-colors"
                    style={{ backgroundColor: color.hex }}
                  />
                  <h3 className="font-semibold text-neutral-900">{color.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setStep(1)}
              className="text-web-green-600 hover:text-web-green-700 font-medium"
            >
              ← Change model
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStorageSelection = () => {
    const model = getSelectedModel();
    if (!model) return null;

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">{model.displayName}</h1>
          <p className="text-xl text-neutral-600">Choose your storage</p>
          <p className="text-neutral-500 mt-2">Color: {selectedConfig.color}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {model.storageOptions.map((storage) => (
              <div
                key={storage.size}
                onClick={() => handleStorageSelect(storage.size, storage.price)}
                className="cursor-pointer bg-white rounded-2xl p-6 border border-neutral-200 hover:border-web-green-300 hover:shadow-md transition-all duration-300 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">{storage.size}</h3>
                  <p className="text-neutral-600">Storage capacity</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-neutral-900">${storage.price}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center space-x-6">
            <button
              onClick={() => setStep(1)}
              className="text-web-green-600 hover:text-web-green-700 font-medium"
            >
              ← Change model
            </button>
            <button
              onClick={() => setStep(2)}
              className="text-web-green-600 hover:text-web-green-700 font-medium"
            >
              ← Change color
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    const model = getSelectedModel();
    const storage = getSelectedStorage();
    if (!model || !storage) return null;

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Review your order</h1>
          <p className="text-xl text-neutral-600">Your new iPhone is ready</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 border border-neutral-200">
            <div className="flex items-center gap-8 mb-8">
              <div className="text-6xl">{model.image}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">{model.displayName}</h2>
                <div className="space-y-1 text-neutral-600">
                  <p>Color: {selectedConfig.color}</p>
                  <p>Storage: {selectedConfig.storage}</p>
                  <p>Display: {model.displaySize}</p>
                  <p>Chip: {model.chip}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-neutral-900">${selectedConfig.totalPrice}</div>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <h3 className="font-semibold text-neutral-900 mb-4">What's included</h3>
              <ul className="space-y-2">
                {model.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-neutral-600">
                    <span className="text-web-green-500 mt-1">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-neutral-200 pt-6 mt-6">
              <div className="space-y-4">
                <button
                  onClick={handleAddToBag}
                  className="w-full bg-web-green-500 hover:bg-web-green-600 text-white py-4 rounded-full text-lg font-semibold transition-colors"
                >
                  Add to Bag - ${selectedConfig.totalPrice}
                </button>
                
                <div className="text-center space-x-6">
                  <button
                    onClick={() => setStep(1)}
                    className="text-web-green-600 hover:text-web-green-700 font-medium"
                  >
                    Change model
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="text-web-green-600 hover:text-web-green-700 font-medium"
                  >
                    Change color
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="text-web-green-600 hover:text-web-green-700 font-medium"
                  >
                    Change storage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/store" className="text-neutral-600 hover:text-neutral-900 font-medium">
              ← Store
            </Link>
            <h1 className="font-semibold text-neutral-900">Shop iPhone</h1>
            <button className="text-neutral-600 hover:text-neutral-900">
              🛒
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {renderStepIndicator()}
        
        {step === 1 && renderModelSelection()}
        {step === 2 && renderColorSelection()}
        {step === 3 && renderStorageSelection()}
        {step === 4 && renderSummary()}
      </div>
    </div>
  );
};

export default ShopIPhone;