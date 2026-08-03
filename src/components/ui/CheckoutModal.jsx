import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, ShoppingCart, Award, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onClearCart 
}) {
  const [step, setStep] = useState(1); // 1: Shipping/Billing, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.name.trim()) newErrors.name = 'Full name required';
    if (!formData.address.trim()) newErrors.address = 'Shipping address required';
    if (!formData.city.trim()) newErrors.city = 'City required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.cardNumber || formData.cardNumber.length < 16) newErrors.cardNumber = 'Valid 16-digit card required';
    if (!formData.expiry || !/^\d{2}\/\d{2}$/.test(formData.expiry)) newErrors.expiry = 'MM/YY required';
    if (!formData.cvv || formData.cvv.length < 3) newErrors.cvv = 'Valid CVV required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) setStep(2);
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      setStep(3);
      // Trigger Confetti!
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    // Beautiful massive confetti explosion
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#00f2fe', '#9b51e0', '#f8fafc']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00f2fe', '#9b51e0', '#f8fafc']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };
  const shipping = 9.99;
  const total = calculateSubtotal() + shipping;

  const handleCloseSuccess = () => {
    onClearCart();
    setStep(1);
    setFormData({
      email: '',
      name: '',
      address: '',
      city: '',
      zip: '',
      cardNumber: '',
      expiry: '',
      cvv: ''
    });
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="checkout-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={22} color="var(--primary)" />
            {step === 3 ? 'Order Complete' : 'Secure Checkout'}
          </h2>
          {step !== 3 && (
            <button className="btn-close" onClick={onClose}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* Form Body */}
        <div className="checkout-body">
          {step !== 3 && (
            <div className="checkout-steps">
              <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
              <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
              <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleNextStep} className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>1. Delivery Address</h3>
              
              <div className="input-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange}
                  className="input-field" 
                  placeholder="name@domain.com"
                />
                {errors.email && <span style={{ color: '#ff0844', fontSize: '11px' }}>{errors.email}</span>}
              </div>

              <div className="input-group">
                <label>Recipient Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  className="input-field" 
                  placeholder="Alex Mercer"
                />
                {errors.name && <span style={{ color: '#ff0844', fontSize: '11px' }}>{errors.name}</span>}
              </div>

              <div className="input-group">
                <label>Street Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange}
                  className="input-field" 
                  placeholder="123 Neon Parkway"
                />
                {errors.address && <span style={{ color: '#ff0844', fontSize: '11px' }}>{errors.address}</span>}
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Neo City"
                  />
                  {errors.city && <span style={{ color: '#ff0844', fontSize: '11px' }}>{errors.city}</span>}
                </div>
                <div className="input-group">
                  <label>ZIP / Postal Code</label>
                  <input 
                    type="text" 
                    name="zip" 
                    value={formData.zip} 
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="90210"
                  />
                  {errors.zip && <span style={{ color: '#ff0844', fontSize: '11px' }}>{errors.zip}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="submit" className="btn-primary">
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleCompleteOrder} className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>2. Payment Details</h3>
              
              <div className="checkout-summary-box">
                <span className="config-section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShoppingCart size={13} /> Order Summary
                </span>
                {cartItems.map(item => (
                  <div key={item.id} className="summary-row">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Due</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="input-group">
                <label>Cardholder Name</label>
                <input 
                  type="text" 
                  name="cardName" 
                  value={formData.name} 
                  disabled
                  className="input-field" 
                  style={{ opacity: 0.7 }}
                />
              </div>

              <div className="input-group">
                <label>Card Number</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="cardNumber" 
                    maxLength="16"
                    value={formData.cardNumber} 
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="4000123456789010"
                    style={{ paddingLeft: '40px', width: '100%' }}
                  />
                  <CreditCard size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                </div>
                {errors.cardNumber && <span style={{ color: '#ff0844', fontSize: '11px' }}>{errors.cardNumber}</span>}
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label>Expiration Date</label>
                  <input 
                    type="text" 
                    name="expiry" 
                    maxLength="5"
                    value={formData.expiry} 
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="MM/YY"
                  />
                  {errors.expiry && <span style={{ color: '#ff0844', fontSize: '11px' }}>{errors.expiry}</span>}
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input 
                    type="password" 
                    name="cvv" 
                    maxLength="3"
                    value={formData.cvv} 
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="***"
                  />
                  {errors.cvv && <span style={{ color: '#ff0844', fontSize: '11px' }}>{errors.cvv}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                  Back to Shipping
                </button>
                <button type="submit" className="btn-primary">
                  Pay ${total.toFixed(2)}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="success-screen animate-fade">
              <div className="success-icon-wrapper">
                <CheckCircle size={40} />
              </div>
              <h2 className="success-title">Order Transmitted!</h2>
              <span className="success-desc">
                Congratulations, your customization specifications have been sent to our modern fabrication units. You will receive a tracking link via email soon!
              </span>
              <div 
                className="checkout-summary-box" 
                style={{ width: '100%', maxWidth: '360px', marginTop: '10px', textAlign: 'left' }}
              >
                <div className="summary-row">
                  <span>Order Reference</span>
                  <span style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>#VTX-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Address</span>
                  <span>{formData.address}, {formData.city}</span>
                </div>
                <div className="summary-row">
                  <span>Authorized Charge</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                className="btn-primary" 
                style={{ marginTop: '15px' }}
                onClick={handleCloseSuccess}
              >
                Return to Studio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
