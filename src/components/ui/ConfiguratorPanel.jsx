import React, { useState, useEffect } from 'react';
import { Palette, Layers, Image as ImageIcon, Plus, Sliders, ShoppingBag } from 'lucide-react';

// Generates high-definition PNG data URLs programmatically using HTML Canvas.
// This is 100% compatible with Three.js WebGL texture loaders and works fully offline.
const generateLogoPng = (type) => {
  if (typeof window === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Clear to transparent
  ctx.clearRect(0, 0, 512, 512);
  
  if (type === 'vortex') {
    // Outer dashed ring
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 14;
    ctx.setLineDash([30, 20]);
    ctx.beginPath();
    ctx.arc(256, 256, 200, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Top purple triangle
    ctx.fillStyle = '#9b51e0';
    ctx.beginPath();
    ctx.moveTo(256, 110);
    ctx.lineTo(350, 240);
    ctx.lineTo(162, 240);
    ctx.closePath();
    ctx.fill();
    
    // Bottom cyan triangle
    ctx.fillStyle = '#00f2fe';
    ctx.beginPath();
    ctx.moveTo(256, 402);
    ctx.lineTo(162, 272);
    ctx.lineTo(350, 272);
    ctx.closePath();
    ctx.fill();
    
    // Center branding text
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 44px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('VR-TX', 256, 256);
    
  } else if (type === 'cyberpunk') {
    // Purple cybernetic grid box
    ctx.strokeStyle = '#9b51e0';
    ctx.lineWidth = 16;
    ctx.strokeRect(80, 80, 352, 352);
    
    // Cyan inner grid lines
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 6;
    for (let i = 136; i < 400; i += 68) {
      ctx.beginPath(); ctx.moveTo(80, i); ctx.lineTo(432, i); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(i, 80); ctx.lineTo(i, 432); ctx.stroke();
    }
    
    // Core indicator circle
    ctx.fillStyle = '#07080b';
    ctx.strokeStyle = '#ff0844';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(256, 256, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
  } else if (type === 'minimalist') {
    // Outer white ring
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 10;
    ctx.beginPath(); ctx.arc(256, 256, 170, 0, Math.PI * 2); ctx.stroke();
    
    // Inner dashed ring
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 6;
    ctx.setLineDash([15, 15]);
    ctx.beginPath(); ctx.arc(256, 256, 110, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    
    // Vector axis
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(40, 256); ctx.lineTo(472, 256); ctx.stroke();
    ctx.strokeStyle = '#9b51e0';
    ctx.beginPath(); ctx.moveTo(256, 40); ctx.lineTo(256, 472); ctx.stroke();
    
    // Center diamond
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 8;
    ctx.save();
    ctx.translate(256, 256);
    ctx.rotate(Math.PI / 4);
    ctx.strokeRect(-35, -35, 70, 70);
    ctx.restore();
    
  } else if (type === 'streetwear') {
    // Neon red core droplet/flame
    ctx.fillStyle = '#ff0844';
    ctx.beginPath();
    ctx.moveTo(256, 90);
    ctx.quadraticCurveTo(140, 200, 256, 430);
    ctx.quadraticCurveTo(372, 200, 256, 90);
    ctx.fill();
    
    // Inner soft flame layer
    ctx.fillStyle = '#ffb199';
    ctx.beginPath();
    ctx.moveTo(256, 150);
    ctx.quadraticCurveTo(180, 230, 256, 370);
    ctx.quadraticCurveTo(332, 230, 256, 150);
    ctx.fill();
    
    // Core dot
    ctx.fillStyle = '#00f2fe';
    ctx.beginPath();
    ctx.arc(256, 260, 24, 0, Math.PI * 2);
    ctx.fill();
    
    // Streetwear typography
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 36px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TOXIC CORE', 256, 475);
  }
  
  return canvas.toDataURL('image/png');
};

export const LOGO_PRESETS = [
  { id: 'vortex', name: 'Vortex Tech', url: generateLogoPng('vortex') },
  { id: 'cyberpunk', name: 'Neo Grid', url: generateLogoPng('cyberpunk') },
  { id: 'minimalist', name: 'Echo Orb', url: generateLogoPng('minimalist') },
  { id: 'streetwear', name: 'Toxic Core', url: generateLogoPng('streetwear') }
];

export const FABRICS = [
  { id: 'cotton', name: 'Premium Cotton', price: 0, desc: 'Soft, breathable 100% organic cotton fabric.' },
  { id: 'matte', name: 'Tech Matte', price: 5, desc: 'Durable structured blend with zero sheen.' },
  { id: 'heavy', name: 'Heavy Terry', price: 10, desc: 'Thick, insulating looped-back luxury weave.' },
  { id: 'nylon', name: 'Glossy Nylon', price: 15, desc: 'Dynamic sheen and water-resistant synthetic fiber.' },
  { id: 'silk', name: 'Cyber Silk', price: 20, desc: 'Sleek, high-reflection futuristic weave.' }
];

export const PRESET_COLORS = [
  { name: 'Matte Black', value: '#0d0d12' },
  { name: 'Arctic White', value: '#f1f5f9' },
  { name: 'Tech Cyan', value: '#00f2fe' },
  { name: 'Cyber Purple', value: '#9b51e0' },
  { name: 'Toxic Lime', value: '#39ff14' },
  { name: 'Crimson Core', value: '#ef4444' },
  { name: 'Solar Gold', value: '#f59e0b' },
  { name: 'Shadow Slate', value: '#475569' },
  { name: 'Desert Dune', value: '#d97706' },
  { name: 'Eco Sage', value: '#10b981' },
  { name: 'Glitch Indigo', value: '#6366f1' },
  { name: 'Bubblegum Pink', value: '#ec4899' }
];

export default function ConfiguratorPanel({ 
  customState, 
  setCustomState, 
  onAddToCart,
  basePrice = 45 
}) {
  const [activeTab, setActiveTab] = useState('colors'); // colors, fabric, logos
  const [activePart, setActivePart] = useState('body'); // body, sleeves, collar, hem

  const isRealistic = customState.type === 'realistic';

  // Force activePart to body when switching to realistic mode
  useEffect(() => {
    if (isRealistic) {
      setActivePart('body');
    }
  }, [isRealistic]);

  // Calculate current price
  const selectedFabricObj = FABRICS.find(f => f.id === customState.fabric) || FABRICS[0];
  const totalPrice = basePrice + selectedFabricObj.price + (customState.decal ? 5 : 0);

  const handleColorChange = (hex) => {
    if (isRealistic) {
      setCustomState(prev => ({
        ...prev,
        colors: {
          ...prev.colors,
          body: hex,
          sleeves: hex,
          collar: hex,
          hem: hex
        }
      }));
    } else {
      setCustomState(prev => ({
        ...prev,
        colors: {
          ...prev.colors,
          [activePart]: hex
        }
      }));
    }
  };

  const handleFabricChange = (fabricId) => {
    setCustomState(prev => ({
      ...prev,
      fabric: fabricId
    }));
  };

  const handleDecalSelect = (decalUrl) => {
    setCustomState(prev => ({
      ...prev,
      decal: prev.decal === decalUrl ? null : decalUrl
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomState(prev => ({
        ...prev,
        decal: url
      }));
    }
  };

  return (
    <div className="config-sidebar">
      {/* Header */}
      <div className="config-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="config-title">Studio Config</span>
          <span className="tag-badge" style={{ position: 'static' }}>
            {isRealistic ? 'Realistic Fit' : customState.type === 'tee' ? 'Block Tee' : 'Block Hoodie'}
          </span>
        </div>
        <span className="config-subtitle">Customize clothing elements in real-time</span>
      </div>

      {/* Tabs */}
      <div className="config-tabs">
        <button 
          className={`config-tab ${activeTab === 'colors' ? 'active' : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          <Palette size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Colors
        </button>
        <button 
          className={`config-tab ${activeTab === 'fabric' ? 'active' : ''}`}
          onClick={() => setActiveTab('fabric')}
        >
          <Layers size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Fabrics
        </button>
        <button 
          className={`config-tab ${activeTab === 'logos' ? 'active' : ''}`}
          onClick={() => setActiveTab('logos')}
        >
          <ImageIcon size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Graphics
        </button>
      </div>

      {/* Panel Contents */}
      <div className="config-content">
        
        {/* COLORS TAB */}
        {activeTab === 'colors' && (
          <div className="animate-fade">
            {!isRealistic ? (
              <>
                <span className="config-section-title">Select Section</span>
                <div className="part-selector">
                  <button 
                    className={`part-btn ${activePart === 'body' ? 'active' : ''}`}
                    onClick={() => setActivePart('body')}
                  >
                    Body
                  </button>
                  <button 
                    className={`part-btn ${activePart === 'sleeves' ? 'active' : ''}`}
                    onClick={() => setActivePart('sleeves')}
                  >
                    Sleeves
                  </button>
                  <button 
                    className={`part-btn ${activePart === 'collar' ? 'active' : ''}`}
                    onClick={() => setActivePart('collar')}
                  >
                    Collar
                  </button>
                  <button 
                    className={`part-btn ${activePart === 'hem' ? 'active' : ''}`}
                    onClick={() => setActivePart('hem')}
                  >
                    {customState.type === 'tee' ? 'Hem' : 'Cuffs'}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ marginBottom: '16px' }}>
                <span className="config-section-title">Base Garment Color</span>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Applying solid custom dye layers to the realistic folded T-shirt.
                </p>
              </div>
            )}

            <span className="config-section-title">Palette Presets</span>
            <div className="color-picker-grid">
              {PRESET_COLORS.map(color => (
                <div key={color.name} className="color-swatch-wrapper">
                  <button 
                    className={`color-swatch ${
                      (isRealistic ? customState.colors.body : customState.colors[activePart]) === color.value ? 'active' : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorChange(color.value)}
                    title={color.name}
                  />
                </div>
              ))}
            </div>

            {/* Custom Color Selector */}
            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <span className="config-section-title" style={{ marginBottom: '4px' }}>Custom Shade</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="color" 
                    value={isRealistic ? customState.colors.body : customState.colors[activePart]} 
                    onChange={(e) => handleColorChange(e.target.value)}
                    style={{ 
                      border: '1px solid var(--border-glass-active)', 
                      borderRadius: '6px', 
                      background: 'none', 
                      width: '42px', 
                      height: '42px', 
                      cursor: 'pointer' 
                    }} 
                  />
                  <input 
                    type="text" 
                    value={(isRealistic ? customState.colors.body : customState.colors[activePart]).toUpperCase()} 
                    onChange={(e) => handleColorChange(e.target.value)}
                    placeholder="#FFFFFF"
                    className="input-field"
                    style={{ flex: 1, padding: '10px', height: '42px' }} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FABRIC TAB */}
        {activeTab === 'fabric' && (
          <div className="fabric-grid animate-fade">
            {FABRICS.map(fabric => (
              <div 
                key={fabric.id} 
                className={`fabric-card ${customState.fabric === fabric.id ? 'active' : ''}`}
                onClick={() => handleFabricChange(fabric.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="fabric-name">{fabric.name}</span>
                  {fabric.price > 0 && (
                    <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 'bold' }}>
                      +${fabric.price}
                    </span>
                  )}
                </div>
                <span className="fabric-desc">{fabric.desc}</span>
              </div>
            ))}
          </div>
        )}

        {/* GRAPHICS TAB */}
        {activeTab === 'logos' && (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span className="config-section-title">Brand Decals</span>
              <div className="logo-grid">
                {LOGO_PRESETS.map(logo => (
                  <button 
                    key={logo.id} 
                    className={`logo-item ${customState.decal === logo.url ? 'active' : ''}`}
                    onClick={() => handleDecalSelect(logo.url)}
                    title={logo.name}
                  >
                    <img 
                      src={logo.url} 
                      alt={logo.name} 
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="config-section-title">Upload Custom Logo</span>
              <label className="upload-container">
                <Plus size={20} color="var(--primary)" />
                <span className="upload-text">Select Image File</span>
                <span className="upload-subtext">PNG, JPG, or SVG (Transparencies recommended)</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="upload-input" 
                />
              </label>
            </div>

            {customState.decal && (
              <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--border-glass)' }}>
                <span className="config-section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sliders size={13} /> Decal Tuning
                </span>
                
                {/* Scale Slider */}
                <div className="slider-group">
                  <div className="slider-header">
                    <span>Decal Size</span>
                    <span>{Math.round(customState.decalScale * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="0.8" 
                    step="0.01" 
                    value={customState.decalScale} 
                    onChange={(e) => setCustomState(prev => ({ ...prev, decalScale: parseFloat(e.target.value) }))}
                    className="slider-input" 
                  />
                </div>

                {/* X Position Slider */}
                <div className="slider-group">
                  <div className="slider-header">
                    <span>Horizontal Shift</span>
                    <span>{customState.decalPosition.x.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="-0.2" 
                    max="0.2" 
                    step="0.01" 
                    value={customState.decalPosition.x} 
                    onChange={(e) => setCustomState(prev => ({ 
                      ...prev, 
                      decalPosition: { ...prev.decalPosition, x: parseFloat(e.target.value) } 
                    }))}
                    className="slider-input" 
                  />
                </div>

                {/* Y Position Slider */}
                <div className="slider-group">
                  <div className="slider-header">
                    <span>Vertical Shift</span>
                    <span>{customState.decalPosition.y.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="-0.2" 
                    max="0.2" 
                    step="0.01" 
                    value={customState.decalPosition.y} 
                    onChange={(e) => setCustomState(prev => ({ 
                      ...prev, 
                      decalPosition: { ...prev.decalPosition, y: parseFloat(e.target.value) } 
                    }))}
                    className="slider-input" 
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer / Add to Cart */}
      <div className="config-footer">
        <div className="config-price-row">
          <span className="price-label">Custom Build Price</span>
          <span className="price-val">${totalPrice.toFixed(2)}</span>
        </div>
        <button 
          className="btn-primary" 
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => onAddToCart(totalPrice)}
        >
          <ShoppingBag size={16} />
          ADD CUSTOM DESIGN
        </button>
      </div>
    </div>
  );
}
