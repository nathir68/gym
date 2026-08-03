import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Grid } from '@react-three/drei';
import ShirtModel from './ShirtModel';

export default function ClothingStudio({ customState }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="canvas-wrapper"
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <Suspense fallback={
        <div className="canvas-loader">
          <div className="spinner"></div>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}>
            LOADING 3D ENGINE...
          </span>
        </div>
      }>
        <Canvas
          shadows
          camera={{ position: [0, 0, 2.6], fov: 45 }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
        >
          {/* Lighting System */}
          <ambientLight intensity={0.4} />
          
          {/* Studio Key Light */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />

          {/* Fill Light (Soft) */}
          <directionalLight
            position={[-5, 3, 2]}
            intensity={0.6}
          />

          {/* Rim Light (Gives clothing edge definitions) */}
          <pointLight 
            position={[0, 5, -5]} 
            intensity={1.5} 
            color="#00f2fe" 
          />

          {/* Backlight Glow Anchor */}
          <pointLight
            position={[0, -2, -3]}
            intensity={1.0}
            color="#9b51e0"
          />

          {/* Main Customizable Model */}
          <Center>
            <ShirtModel customState={customState} isHovered={isHovered} />
          </Center>

          {/* Dynamic Grid Floor */}
          <Grid
            position={[0, -1.8, 0]}
            args={[10.5, 10.5]}
            cellSize={0.5}
            cellThickness={1}
            cellColor="#1e293b"
            sectionSize={2.0}
            sectionThickness={1.5}
            sectionColor="#4facfe"
            fadeDistance={20}
            fadeStrength={1}
            infiniteGrid
          />

          {/* Camera controls */}
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minDistance={1.8}
            maxDistance={4.5}
            minPolarAngle={Math.PI / 3} // prevent looking from directly underneath
            maxPolarAngle={Math.PI / 1.8} // prevent rotating too low
            makeDefault
          />
        </Canvas>
      </Suspense>

      {/* Action/Interactivity instructions */}
      <div className="studio-hints">
        <div className="studio-hint-pill">
          <span>🖱️ Drag to Rotate</span>
        </div>
        <div className="studio-hint-pill">
          <span>🔍 Scroll to Zoom</span>
        </div>
      </div>
    </div>
  );
}
