import React from 'react';
import { Sparkles, Edit2 } from 'lucide-react';
import { LOGO_PRESETS } from './ConfiguratorPanel';

// Helper to generate custom styled SVG preview for product cards
export const ProductSVGPreview = ({ colors, isHoodie, style }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="product-image-svg" 
      style={style}
    >
      {isHoodie ? (
        // Hoodie SVG
        <g>
          {/* Sleeves */}
          <path d="M15,35 L5,70 L20,75 L28,45 Z" fill={colors.sleeves} stroke="#ffffff" strokeWidth="0.5" />
          <path d="M85,35 L95,70 L80,75 L72,45 Z" fill={colors.sleeves} stroke="#ffffff" strokeWidth="0.5" />
          {/* Cuffs */}
          <rect x="3" y="68" width="18" height="6" rx="2" transform="rotate(20 12 71)" fill={colors.hem} />
          <rect x="79" y="68" width="18" height="6" rx="2" transform="rotate(-20 88 71)" fill={colors.hem} />
          {/* Body */}
          <path d="M28,30 L72,30 L76,82 L24,82 Z" fill={colors.body} />
          {/* Pocket */}
          <path d="M35,62 L65,62 L60,80 L40,80 Z" fill={colors.body} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          {/* Hood */}
          <path d="M32,32 C32,10 68,10 68,32 Z" fill={colors.collar} />
          {/* Hem */}
          <rect x="23" y="80" width="54" height="6" rx="2" fill={colors.hem} />
        </g>
      ) : (
        // T-Shirt SVG
        <g>
          {/* Sleeves */}
          <path d="M22,25 L5,45 L16,55 L28,40 Z" fill={colors.sleeves} />
          <path d="M78,25 L95,45 L84,55 L72,40 Z" fill={colors.sleeves} />
          {/* Body */}
          <path d="M26,20 L74,20 L76,80 L24,80 Z" fill={colors.body} />
          {/* Collar */}
          <path d="M36,20 C36,32 64,32 64,20 Z" fill={colors.collar} />
          {/* Hem */}
          <rect x="23" y="78" width="54" height="4" rx="1" fill={colors.hem} />
        </g>
      )}
    </svg>
  );
};

export const PRESET_PRODUCTS = [
  {
    id: 'aero-tech',
    name: 'Aero-Tech Tee',
    type: 'tee',
    tag: 'Cyber Classic',
    description: 'Minimalist tech-mesh tee with high-reflectivity collar detailing.',
    price: 49.99,
    colors: {
      body: '#0d0d12', // Matte Black
      sleeves: '#475569', // Shadow Slate
      collar: '#00f2fe', // Tech Cyan
      hem: '#00f2fe'
    },
    fabric: 'matte',
    decal: LOGO_PRESETS[0].url // Vortex Logo
  },
  {
    id: 'solaris-wind',
    name: 'Solaris Hoodie',
    type: 'hoodie',
    tag: 'Premium Outer',
    description: 'Thick-looped insulated heavy terry hoodie with warning gold colorways.',
    price: 89.99,
    colors: {
      body: '#f59e0b', // Solar Gold
      sleeves: '#0d0d12', // Matte Black
      collar: '#0d0d12',
      hem: '#ef4444' // Crimson Hem
    },
    fabric: 'heavy',
    decal: LOGO_PRESETS[1].url // Neo Grid
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Core',
    type: 'tee',
    tag: 'Hyper street',
    description: 'High-shine cyber silk fabric featuring vibrant neon accents.',
    price: 59.99,
    colors: {
      body: '#0d0d12',
      sleeves: '#39ff14', // Toxic Lime
      collar: '#ec4899', // Bubblegum Pink
      hem: '#39ff14'
    },
    fabric: 'silk',
    decal: LOGO_PRESETS[3].url // Toxic Rose
  },
  {
    id: 'monochrome-classic',
    name: 'Ghost Tee',
    type: 'tee',
    tag: 'Essential',
    description: 'Sleek matte-white street profile with a contrasting black neckline.',
    price: 44.99,
    colors: {
      body: '#f1f5f9', // Arctic White
      sleeves: '#f1f5f9',
      collar: '#0d0d12',
      hem: '#0d0d12'
    },
    fabric: 'cotton',
    decal: LOGO_PRESETS[2].url // Echo Orb
  }
];

export default function ProductCatalog({ onSelectProduct, onAddToCart }) {
  
  const handleEditClick = (product) => {
    // Load product specs into state
    onSelectProduct({
      type: product.type,
      colors: { ...product.colors },
      fabric: product.fabric,
      decal: product.decal,
      decalScale: 0.35,
      decalPosition: { x: 0, y: 0 }
    });
    
    // Smooth scroll back to 3D studio
    const studioSection = document.getElementById('studio-section');
    if (studioSection) {
      studioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInstantAdd = (product) => {
    onAddToCart({
      id: Math.random().toString(36).substring(2, 9),
      name: product.name,
      type: product.type,
      price: product.price,
      colors: { ...product.colors },
      fabric: product.fabric,
      decal: product.decal,
      quantity: 1
    });
  };

  return (
    <section className="catalog-section" id="catalog-section">
      <div className="catalog-header">
        <span className="catalog-subtitle">Seasonal Collection</span>
        <h2 className="catalog-title">Premium Pre-configured Styles</h2>
        <span className="catalog-desc">
          Browse our expert curated styling drops. Instantly add them to your cart, or click "Customize in 3D" to fine-tune color blocking, fabric blends, and decals.
        </span>
      </div>

      <div className="catalog-grid">
        {PRESET_PRODUCTS.map(product => (
          <div key={product.id} className="glass-card product-card">
            
            <div className="product-image-container">
              <span className="tag-badge">{product.tag}</span>
              <ProductSVGPreview colors={product.colors} isHoodie={product.type === 'hoodie'} />
            </div>

            <div className="product-details">
              <span className="product-type">
                {product.type === 'tee' ? 'Organic Tee' : 'Premium Hoodie'}
              </span>
              <h3 className="product-name">{product.name}</h3>
              <span className="fabric-desc" style={{ marginTop: '4px' }}>
                {product.description}
              </span>
            </div>

            <div className="product-row">
              <span className="product-price">${product.price}</span>
              
              <div className="product-colors-preview">
                {Object.values(product.colors).map((c, i) => (
                  <div 
                    key={i} 
                    className="color-dot" 
                    style={{ backgroundColor: c }} 
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '10px', marginTop: '10px' }}>
              <button 
                className="btn-secondary"
                style={{ fontSize: '13px', padding: '10px', justifyContent: 'center' }}
                onClick={() => handleEditClick(product)}
              >
                <Edit2 size={13} />
                Edit in 3D
              </button>
              <button 
                className="btn-primary"
                style={{ fontSize: '13px', padding: '10px', justifyContent: 'center' }}
                onClick={() => handleInstantAdd(product)}
              >
                Buy Now
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
