import React, { useState, useRef, useEffect } from 'react';

// Custom SVG silhouettes representing Before & After results
// This ensures the visuals look high-end, load instantly, and don't break due to external URLs.

const BeforeVisual = () => (
  <div 
    style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at center, #241616 0%, #0d0d0f 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}
  >
    {/* Background Grid Pattern */}
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }} />
    
    {/* Muted Torso Silhouette (Softer chest, thicker waistline) */}
    <svg width="220" height="280" viewBox="0 0 100 120" style={{ opacity: 0.45, zIndex: 1 }}>
      {/* Head */}
      <circle cx="50" cy="18" r="8" fill="#7f1d1d" />
      {/* Torso & Shoulders */}
      <path 
        d="M 32 30 
           Q 50 28 68 30 
           Q 69 45 66 60 
           Q 64 80 62 100 
           L 38 100 
           Q 36 80 34 60 
           Q 31 45 32 30 Z" 
        fill="#7f1d1d" 
      />
      {/* Arms */}
      <path d="M 32 30 Q 24 50 26 75 M 68 30 Q 76 50 74 75" stroke="#7f1d1d" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Text Info */}
    </svg>

    <div style={{ zIndex: 2, position: 'absolute', bottom: '24px', textAlign: 'center' }}>
      <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
        WEEK 1 - UNTRAINED
      </span>
      <h4 style={{ color: '#fff', fontSize: '1.2rem', marginTop: '8px', fontFamily: 'var(--font-heading)' }}>
        Weight: 96 kg | Body Fat: 24%
      </h4>
    </div>
  </div>
);

const AfterVisual = () => (
  <div 
    style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at center, #1b2611 0%, #080a08 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}
  >
    {/* Glowing Orange/Lime Grid Pattern */}
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(rgba(212,255,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,255,0,0.04) 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }} />
    
    {/* Muscular Torso Silhouette with Glowing Muscle Fibers */}
    <svg width="220" height="280" viewBox="0 0 100 120" style={{ zIndex: 1 }}>
      {/* Glow filter */}
      <defs>
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Head */}
      <circle cx="50" cy="18" r="8" fill="#d4ff00" />
      
      {/* V-Taper Torso & Abs Definition (Wider shoulders, thin waist) */}
      <path 
        d="M 24 30 
           Q 50 27 76 30 
           Q 72 45 68 60 
           Q 60 85 57 100 
           L 43 100 
           Q 40 85 32 60 
           Q 28 45 24 30 Z" 
        fill="#1e2908" 
        stroke="#d4ff00"
        strokeWidth="1.5"
      />
      
      {/* Broad shoulders/arms */}
      <path d="M 24 30 Q 14 48 18 75" stroke="#d4ff00" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M 76 30 Q 86 48 82 75" stroke="#d4ff00" strokeWidth="9" strokeLinecap="round" fill="none" />

      {/* Abs grid lines */}
      <path d="M 45 55 H 55 M 44 65 H 56 M 45 75 H 55 M 47 85 H 53" stroke="#d4ff00" strokeWidth="1.5" opacity="0.8" />
      {/* Chest Lines */}
      <path d="M 33 42 Q 50 48 67 42 M 50 42 V 90" stroke="#d4ff00" strokeWidth="2" opacity="0.9" />
    </svg>

    <div style={{ zIndex: 2, position: 'absolute', bottom: '24px', textAlign: 'center' }}>
      <span className="badge" style={{ backgroundColor: 'rgba(212, 255, 0, 0.15)', color: '#d4ff00', border: '1px solid rgba(212, 255, 0, 0.3)', filter: 'drop-shadow(0 0 4px rgba(212,255,0,0.2))' }}>
        WEEK 12 - TRANSFORMEE
      </span>
      <h4 style={{ color: '#fff', fontSize: '1.2rem', marginTop: '8px', fontFamily: 'var(--font-heading)' }}>
        Weight: 84 kg | Body Fat: 9.8%
      </h4>
    </div>
  </div>
);

export default function TransformationSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Title Header */}
      <div style={{ textAlign: 'center' }}>
        <h3 className="text-display" style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '8px' }}>
          REAL MEMBER PROGRESS
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto' }}>
          Drag the center handle bar left or right to inspect the transformation results of our members after a 12-week program.
        </p>
      </div>

      {/* Slider Container */}
      <div 
        ref={containerRef}
        className="slider-container"
        onTouchStart={handleMouseDown}
        onMouseDown={handleMouseDown}
        style={{ cursor: 'ew-resize' }}
      >
        {/* Before Layer (Always Full width behind) */}
        <div className="slider-before">
          <BeforeVisual />
        </div>

        {/* After Layer (Absolute overlay, clipped with clipPath) */}
        <div 
          className="slider-after"
          style={{
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
          }}
        >
          <AfterVisual />
        </div>

        {/* Draggable Vertical Bar Handle */}
        <div 
          className="slider-handle"
          style={{
            left: `${sliderPos}%`
          }}
        >
          <div className="slider-handle-button" style={{ fontFamily: 'var(--font-heading)', fontSize: '12px' }}>
            ◀ ▶
          </div>
        </div>
      </div>
    </div>
  );
}
