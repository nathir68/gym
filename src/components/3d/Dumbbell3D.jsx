import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Dumbbell Mesh Component
function DumbbellMesh({ sizeMode, neonColor }) {
  const groupRef = useRef();
  
  // Track mouse coordinate values for interactive tilt
  const { mouse } = useThree();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth automatic spin rotation
      groupRef.current.rotation.y += delta * 0.45;
      // Gentle wobble motion
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.7) * 0.12;
      
      // Calculate responsive interactive tilt angle based on mouse position
      const targetTiltX = mouse.y * 0.4;
      const targetTiltY = mouse.x * 0.4;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetTiltX, 0.08);
      // Lerp the Y rotation offsets to simulate weight drag
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -targetTiltY * 0.5, 0.08);
    }
  });

  // Calculate plate dimensions and offsets dynamically
  const getPlates = () => {
    const numPlates = sizeMode === 'standard' ? 3 : sizeMode === 'heavy' ? 4 : 5;
    const plates = [];
    
    // Generate plates for left (-1) and right (1) sides of the central bar
    for (let side of [-1, 1]) {
      for (let i = 0; i < numPlates; i++) {
        const baseOffset = 0.65 * side;
        const spacing = 0.18 * side;
        const xPos = baseOffset + (i * spacing);
        // Vary plate size slightly for a tapered premium look
        const radius = 0.95 - (i * 0.06);
        const thickness = 0.14;
        
        plates.push({
          id: `${side}-${i}`,
          position: [xPos, 0, 0],
          radius,
          thickness
        });
      }
    }
    return plates;
  };

  const plates = getPlates();

  return (
    <group ref={groupRef}>
      {/* 1. Solid Central Knurled Bar (Shiny Knurled Chrome Look) */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.085, 0.085, 1.45, 32]} />
        <meshStandardMaterial 
          metalness={0.95} 
          roughness={0.15} 
          color="#d1d5db"
        />
      </mesh>
      
      {/* 2. Inner Heavy Collars */}
      <mesh position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 32]} />
        <meshStandardMaterial metalness={0.9} roughness={0.1} color="#ffffff" />
      </mesh>
      <mesh position={[0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 32]} />
        <meshStandardMaterial metalness={0.9} roughness={0.1} color="#ffffff" />
      </mesh>

      {/* 3. Cast Iron Circular Plates */}
      {plates.map((plate) => (
        <group key={plate.id} position={plate.position}>
          {/* Main heavy cast iron cylinder body */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[plate.radius, plate.radius, plate.thickness, 32]} />
            <meshStandardMaterial 
              metalness={0.8} 
              roughness={0.6} 
              color="#1a1a22" 
            />
          </mesh>
          
          {/* Concentric inner metallic groove ring */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[plate.radius - 0.07, plate.radius - 0.07, plate.thickness + 0.015, 32]} />
            <meshStandardMaterial 
              metalness={0.88} 
              roughness={0.4} 
              color="#0e0e12" 
            />
          </mesh>
        </group>
      ))}

      {/* 4. Outer Locking Thread Nuts */}
      <mesh position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.14, 16]} />
        <meshStandardMaterial metalness={0.92} roughness={0.1} color="#9ca3af" />
      </mesh>
      <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.14, 16]} />
        <meshStandardMaterial metalness={0.92} roughness={0.1} color="#9ca3af" />
      </mesh>
    </group>
  );
}

// Wrapper component carrying canvas parameters and control layouts
export default function Dumbbell3D() {
  const [sizeMode, setSizeMode] = useState('heavy');
  const [colorIdx, setColorIdx] = useState(0);
  
  const colors = ['#ff5722', '#d4ff00', '#00f2fe', '#ec4899'];
  const colorNames = ['BURN ORANGE', 'CYBER LIME', 'VORTEX BLUE', 'CRIMSON PINK'];
  
  const handleToggleColor = () => {
    setColorIdx((prev) => (prev + 1) % colors.length);
  };
  
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* 3D Canvas Rendering Area */}
      <div style={{ flex: 1, minHeight: '380px', position: 'relative' }}>
        <Canvas camera={{ position: [0, 0, 3.4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          
          {/* Key lights casting specular highlights on metallic textures */}
          <directionalLight position={[4, 6, 4]} intensity={2.0} />
          <directionalLight position={[-4, 4, -4]} intensity={0.6} />
          
          {/* Colored glowing point lights reflecting off the cast iron plates */}
          <pointLight position={[0, 1.2, 0.8]} color={colors[colorIdx]} intensity={4.5} distance={5} />
          <pointLight position={[0, -1.2, -0.8]} color="#ffffff" intensity={1.5} distance={4} />
          
          <Center>
            <DumbbellMesh sizeMode={sizeMode} neonColor={colors[colorIdx]} />
          </Center>
          
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      
      {/* Model configurator overlay panel */}
      <div 
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(9, 9, 11, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '12px 16px',
          borderRadius: '10px',
          flexWrap: 'wrap',
          gap: '10px',
          zIndex: 10,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Loadout Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span 
            style={{ 
              fontSize: '11px', 
              color: '#a1a1aa', 
              fontWeight: '700', 
              letterSpacing: '0.08em',
              fontFamily: "'Space Grotesk', sans-serif"
            }}
          >
            LOADOUT:
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['standard', 'heavy', 'extreme'].map((mode) => {
              const isActive = sizeMode === mode;
              const modeLabel = mode === 'standard' ? 'LIGHT' : mode === 'heavy' ? 'HEAVY' : 'BEAST';
              return (
                <button
                  key={mode}
                  onClick={() => setSizeMode(mode)}
                  style={{
                    backgroundColor: isActive ? '#ff5722' : '#1f1f29',
                    border: isActive ? '1px solid #ff5722' : '1px solid rgba(255,255,255,0.05)',
                    color: '#ffffff',
                    padding: '6px 12px',
                    fontSize: '10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    letterSpacing: '0.05em',
                    boxShadow: isActive ? '0 0 10px rgba(255, 87, 34, 0.35)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {modeLabel}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Color Toggler */}
        <button
          onClick={handleToggleColor}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1f1f29',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            color: '#ffffff',
            padding: '6px 12px',
            fontSize: '10px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '700',
            letterSpacing: '0.05em',
            transition: 'all 0.2s ease',
            fontFamily: "'Space Grotesk', sans-serif"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.backgroundColor = '#272732';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.backgroundColor = '#1f1f29';
          }}
        >
          <span 
            style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              display: 'inline-block',
              backgroundColor: colors[colorIdx], 
              boxShadow: `0 0 8px ${colors[colorIdx]}`,
            }}
          />
          <span>{colorNames[colorIdx]}</span>
        </button>
      </div>
    </div>
  );
}
