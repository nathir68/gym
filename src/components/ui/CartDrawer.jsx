import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { ProductSVGPreview } from './ProductCatalog';
import { FABRICS } from './ConfiguratorPanel';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onCheckout 
}) {
  
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const getFabricName = (fabricId) => {
    return FABRICS.find(f => f.id === fabricId)?.name || 'Standard';
  };

  return (
    <div className={`cart-drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">
            <ShoppingBag size={20} color="var(--primary)" />
            Your Wardrobe ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </h2>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty animate-fade">
              <ShoppingBag size={48} strokeWidth={1} color="var(--text-muted)" />
              <h3 style={{ fontSize: '18px', color: 'var(--text-primary)' }}>Your Cart is Empty</h3>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Head to the studio or browse the catalog to add items.
              </span>
              <button 
                className="btn-secondary" 
                style={{ marginTop: '10px' }}
                onClick={onClose}
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item animate-fade">
                {/* SVG Config Preview */}
                <div className="cart-item-img">
                  <ProductSVGPreview 
                    colors={item.colors} 
                    isHoodie={item.type === 'hoodie'} 
                    style={{ width: '56px', height: '56px' }}
                  />
                </div>

                {/* Details */}
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <button 
                    className="cart-item-remove"
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="cart-item-specs">
                    <span className="spec-pill">{item.type === 'tee' ? 'Tee' : 'Hoodie'}</span>
                    <span className="spec-pill">{getFabricName(item.fabric)}</span>
                    <span className="spec-pill" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Color Block: 
                      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.colors.body, border: '1px solid rgba(255,255,255,0.2)' }} />
                    </span>
                    {item.decal && <span className="spec-pill">Graphics Addon</span>}
                  </div>

                  <div className="cart-item-price-row">
                    {/* Qty */}
                    <div className="qty-selectors">
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Subtotal</span>
              <span className="cart-total-val">${calculateTotal().toFixed(2)}</span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn-secondary" 
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={onClose}
              >
                Back Shop
              </button>
              
              <button 
                className="btn-primary" 
                style={{ flex: 1.5, justifyContent: 'center' }}
                onClick={onCheckout}
              >
                Checkout
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
