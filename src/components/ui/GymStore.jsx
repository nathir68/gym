import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const GEAR_ITEMS = [
  {
    id: 'g1',
    name: 'DH RAW CREATINE MONOHYDRATE',
    price: 34.99,
    category: 'SUPPLEMENTS',
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a1a24"/><rect x="25" y="20" width="50" height="60" rx="6" fill="%230f0f15" stroke="%23ff5722" stroke-width="2"/><text x="50" y="45" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="8" text-anchor="middle">DH NUTRITION</text><text x="50" y="58" fill="%23ff5722" font-family="sans-serif" font-weight="black" font-size="12" text-anchor="middle">CREATINE</text><circle cx="50" cy="72" r="3" fill="%23d4ff00"/></svg>',
    desc: '100% pure micronized creatine monohydrate for cellular ATP regeneration and strength output.'
  },
  {
    id: 'g2',
    name: 'DH HEAVYWEIGHT OVERSIZED HOODIE',
    price: 59.99,
    category: 'APPAREL',
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a1a24"/><path d="M 20 30 L 35 15 L 65 15 L 80 30 L 75 45 L 65 40 L 65 85 L 35 85 L 35 40 L 25 45 Z" fill="%230f0f15" stroke="%23ff5722" stroke-width="2"/><text x="50" y="55" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">DH</text></svg>',
    desc: 'Heavyweight 450GSM cotton loopback fleece. Built to endure cold garage sessions and heavy plates.'
  },
  {
    id: 'g3',
    name: 'DH HEAVY DUTY LIFTING STRAPS',
    price: 19.99,
    category: 'GEAR',
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a1a24"/><path d="M 30 20 C 30 20, 70 20, 70 50 C 70 80, 40 85, 45 60" fill="none" stroke="%23ff5722" stroke-width="8" stroke-linecap="round"/><text x="50" y="45" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="10" text-anchor="middle">STRAP</text></svg>',
    desc: 'Reinforced canvas straps with plush neoprene wrist protection. Lock into the barbell and eliminate grip fatigue.'
  },
  {
    id: 'g4',
    name: 'DH TITANIUM SHAKER BOTTLE',
    price: 24.99,
    category: 'GEAR',
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a1a24"/><path d="M 35 25 L 65 25 L 60 85 L 40 85 Z" fill="%230f0f15" stroke="%23ff5722" stroke-width="2"/><rect x="33" y="15" width="34" height="10" fill="%23333"/><text x="50" y="55" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="10" text-anchor="middle">SHAKER</text></svg>',
    desc: 'Double-walled vacuum-insulated stainless steel shaker. Keeps supplements ice-cold for up to 24 hours.'
  },
  {
    id: 'g5',
    name: 'DH 10MM LEATHER LIFTING BELT',
    price: 79.99,
    category: 'GEAR',
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a1a24"/><rect x="15" y="38" width="70" height="24" rx="3" fill="%230f0f15" stroke="%23ff5722" stroke-width="2"/><circle cx="35" cy="50" r="3" fill="%23fff"/><circle cx="45" cy="50" r="3" fill="%23fff"/><circle cx="55" cy="50" r="3" fill="%23fff"/><text x="70" y="53" fill="%23ff5722" font-family="sans-serif" font-weight="black" font-size="10">DH</text></svg>',
    desc: '10mm thick premium steerhide leather belt with double-prong alloy buckle. Heavy bracing for heavy compound squats.'
  }
];

export default function GymStore({ cartItems, onUpdateCart, isCartOpen, setIsCartOpen }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  // Filter items
  const filteredItems = activeCategory === 'ALL' 
    ? GEAR_ITEMS 
    : GEAR_ITEMS.filter(item => item.category === activeCategory);

  const handleAddToCart = (item) => {
    const existing = cartItems.find(i => i.id === item.id);
    let updated;
    if (existing) {
      updated = cartItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      updated = [...cartItems, { ...item, quantity: 1 }];
    }
    onUpdateCart(updated);
    setIsCartOpen(true);
  };

  const handleQtyChange = (itemId, change) => {
    const updated = cartItems.map(i => {
      if (i.id === itemId) {
        const nextQty = i.quantity + change;
        return nextQty > 0 ? { ...i, quantity: nextQty } : null;
      }
      return i;
    }).filter(Boolean);
    onUpdateCart(updated);
  };

  const handleRemoveItem = (itemId) => {
    const updated = cartItems.filter(i => i.id !== itemId);
    onUpdateCart(updated);
  };

  const handleCheckout = () => {
    // Fire confetti!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff5722', '#d4ff00', '#ffffff']
    });

    setIsCheckoutSuccess(true);
    setTimeout(() => {
      setIsCheckoutSuccess(false);
      onUpdateCart([]);
      setIsCartOpen(false);
    }, 2800);
  };

  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Top filter section */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          paddingBottom: '20px'
        }}
      >
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '8px' }}>DO HARD GEAR</span>
          <h3 className="text-display" style={{ fontSize: '2rem', color: '#fff' }}>IRON STATION STORE</h3>
        </div>
        
        {/* Category Toggles */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['ALL', 'SUPPLEMENTS', 'APPAREL', 'GEAR'].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  backgroundColor: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.02)',
                  border: isActive ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.06)',
                  color: '#fff',
                  padding: '6px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Store Items */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', 
          gap: '24px' 
        }}
      >
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="titanium-card" 
            style={{ 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '380px'
            }}
          >
            {/* Image Box */}
            <div style={{ position: 'relative', width: '100%', height: '180px', backgroundColor: '#131317' }}>
              <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '12px', 
                  right: '12px', 
                  backgroundColor: 'rgba(7,7,9,0.85)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '0.75rem', 
                  color: 'var(--secondary)',
                  fontWeight: '700',
                  fontFamily: 'monospace'
                }}
              >
                ${item.price}
              </span>
            </div>

            {/* Info and action */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '8px', lineHeight: '1.3', fontFamily: 'var(--font-heading)' }}>
                  {item.name}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4' }}>
                  {item.desc}
                </p>
              </div>

              <button
                onClick={() => handleAddToCart(item)}
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  marginTop: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'var(--border-metal)';
                }}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Slider Drawer Overlay */}
      {isCartOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setIsCartOpen(false)}
        >
          {/* Drawer content box */}
          <div 
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#0a0a0f',
              borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '32px 24px',
              position: 'relative',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.8)'
            }}
            onClick={(e) => e.stopPropagation()} // stop close on clicking inside drawer
          >
            {/* Drawer Header */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 className="text-display" style={{ fontSize: '1.8rem', color: '#fff' }}>YOUR CART</h3>
                  <span 
                    style={{ 
                      backgroundColor: 'var(--primary)', 
                      color: '#fff', 
                      borderRadius: '50%', 
                      width: '20px', 
                      height: '20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      fontFamily: 'monospace'
                    }}
                  >
                    {totalCartCount}
                  </span>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => setIsCartOpen(false)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    fontWeight: '300'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Cart items list */}
              <div 
                style={{ 
                  overflowY: 'auto', 
                  maxHeight: 'calc(100vh - 280px)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px',
                  paddingRight: '6px'
                }}
              >
                {isCheckoutSuccess ? (
                  <div 
                    style={{ 
                      textAlign: 'center', 
                      padding: '40px 10px', 
                      color: 'var(--secondary)', 
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontSize: '3rem' }}>🔥</span>
                    <span>ORDER RECEIVED!</span>
                    <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 'normal' }}>
                      Sat-capacity checklist generated. Access tags dispatching shortly.
                    </span>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 10px', color: 'var(--text-muted)' }}>
                    Your gear bag is empty. Add iron gear or supplements to proceed.
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div 
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        paddingBottom: '16px',
                        gap: '12px'
                      }}
                    >
                      {/* Image thumbnail */}
                      <div style={{ width: '50px', height: '50px', backgroundColor: '#131317', borderRadius: '4px', overflow: 'hidden' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      
                      {/* Item info */}
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.8rem', color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                          {item.name}
                        </h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 'bold', fontFamily: 'monospace' }}>
                          ${item.price}
                        </span>
                      </div>

                      {/* Quantity Modifier */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#131317', padding: '4px 8px', borderRadius: '4px' }}>
                        <button 
                          onClick={() => handleQtyChange(item.id, -1)}
                          style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold', width: '15px' }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '0.8rem', color: '#fff', minWidth: '15px', textAlign: 'center', fontFamily: 'monospace' }}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => handleQtyChange(item.id, 1)}
                          style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold', width: '15px' }}
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        style={{ backgroundColor: 'transparent', border: 'none', color: '#ff5722', cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Drawer Checkout Footer */}
            {!isCheckoutSuccess && cartItems.length > 0 && (
              <div 
                style={{ 
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
                  paddingTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                    SUBTOTAL
                  </span>
                  <span style={{ fontSize: '1.4rem', color: '#fff', fontWeight: '800', fontFamily: 'monospace' }}>
                    ${totalCartPrice.toFixed(2)}
                  </span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    letterSpacing: '0.05em'
                  }}
                >
                  SECURE CHECKOUT
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
