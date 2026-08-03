import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Decal, useTexture, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function ShirtModel({ 
  customState, // { type: 'realistic'|'tee'|'hoodie', colors: { body, sleeves, collar, hem }, fabric, decal, decalScale, decalPosition }
  isHovered = false 
}) {
  const modelRef = useRef();

  // Load the realistic T-shirt model unconditionally (suspended by Canvas Suspense wrapper)
  const gltf = useGLTF('/shirt_baked.glb');

  // Load decal texture unconditionally (using 1px transparent fallback if no decal is active)
  const fallbackDecal = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  const logoTexture = useTexture(customState.decal || fallbackDecal);

  // Smooth floating animation
  useFrame((state) => {
    if (!modelRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Soft floating movement
    modelRef.current.position.y = Math.sin(t * 1.5) * 0.04;
    
    if (!isHovered) {
      // Gentle self-rotation when user is not dragging
      modelRef.current.rotation.y = Math.sin(t * 0.25) * 0.12;
    }
  });

  // Get material properties based on selected fabric
  const getFabricMaterial = (fabric) => {
    switch (fabric) {
      case 'matte': // Tech Matte
        return {
          roughness: 0.9,
          metalness: 0.05,
          clearcoat: 0.0,
        };
      case 'heavy': // Heavy Terry (Hoodie fabric)
        return {
          roughness: 0.98,
          metalness: 0.0,
          clearcoat: 0.0,
        };
      case 'nylon': // Glossy Nylon
        return {
          roughness: 0.2,
          metalness: 0.3,
          clearcoat: 0.8,
          clearcoatRoughness: 0.15,
        };
      case 'silk': // Cyber Silk
        return {
          roughness: 0.35,
          metalness: 0.65,
          clearcoat: 0.2,
        };
      case 'cotton': // Classic Cotton
      default:
        return {
          roughness: 0.75,
          metalness: 0.02,
          clearcoat: 0.0,
        };
    }
  };

  const materialProps = {
    ...getFabricMaterial(customState.fabric),
    side: THREE.DoubleSide
  };

  const colors = customState.colors || {
    body: '#ffffff',
    sleeves: '#ffffff',
    collar: '#ffffff',
    hem: '#ffffff'
  };

  const isRealistic = customState.type === 'realistic';
  const isHoodie = customState.type === 'hoodie';

  return (
    <group ref={modelRef} position={[0, 0, 0]} dispose={null}>
      {/* Showroom Display Stand (Only shown for procedural items, realistic shirt floats independently like a digital product showcase) */}
      {!isRealistic && (
        <group position={[0, -0.2, 0]}>
          {/* Metal Base */}
          <mesh position={[0, -1.8, 0]} receiveShadow>
            <cylinderGeometry args={[0.6, 0.65, 0.04, 32]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Vertical Pole */}
          <mesh position={[0, -0.2, -0.15]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 3.2, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.9} />
          </mesh>
          {/* Horizontal Hanger Bar */}
          <mesh position={[0, 1.25, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 1.4, 16]} />
            <meshStandardMaterial color="#475569" roughness={0.5} metalness={0.8} />
          </mesh>
          {/* Hook */}
          <mesh position={[0, 1.35, -0.07]} rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.06, 0.012, 12, 24, Math.PI * 1.5]} />
            <meshStandardMaterial color="#475569" roughness={0.5} metalness={0.8} />
          </mesh>
        </group>
      )}

      {/* CLOTHING RENDER */}
      <group position={[0, isRealistic ? -0.15 : 0.1, 0]}>
        
        {isRealistic && gltf ? (
          /* Realistic Loaded GLB T-Shirt Mesh */
          <mesh 
            castShadow 
            receiveShadow 
            geometry={gltf.nodes.T_Shirt_male.geometry}
            dispose={null}
          >
            <meshStandardMaterial 
              color={colors.body} 
              {...materialProps} 
              aoMap={gltf.materials.lambert1.aoMap}
              aoMapIntensity={0.65}
            />

            {/* Logo Decal projected onto the realistic model (only shown when customState.decal is not null) */}
            {customState.decal && logoTexture && (
              <Decal
                position={[
                  customState.decalPosition?.x || 0, 
                  (customState.decalPosition?.y || 0) + 0.04, 
                  0.15
                ]}
                rotation={[0, 0, 0]}
                // Set the projection box depth to 1.0 to prevent surface curved clipping
                scale={[customState.decalScale, customState.decalScale, 1.0]}
              >
                <meshBasicMaterial
                  map={logoTexture}
                  transparent
                  polygonOffset
                  polygonOffsetFactor={-10}
                  depthWrite={true}
                />
              </Decal>
            )}
          </mesh>
        ) : isHoodie ? (
          /* Custom Procedural Hoodie Model */
          <group>
            {/* Body */}
            <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.85, 0.9, 2.0, 32, 1, true]} />
              <meshStandardMaterial color={colors.body} {...materialProps} />
            </mesh>

            {/* Kangaroo Pocket */}
            <mesh castShadow receiveShadow position={[0, -0.3, 0.18]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.62, 0.62, 0.6, 16, 1, false, -Math.PI / 4, Math.PI / 2]} />
              <meshStandardMaterial color={colors.body} {...materialProps} />
            </mesh>

            {/* Left Sleeve */}
            <mesh 
              castShadow 
              receiveShadow 
              position={[-0.95, 0.2, 0]} 
              rotation={[0, 0, 0.5]}
            >
              <cylinderGeometry args={[0.26, 0.2, 1.5, 24]} />
              <meshStandardMaterial color={colors.sleeves} {...materialProps} />
            </mesh>

            {/* Right Sleeve */}
            <mesh 
              castShadow 
              receiveShadow 
              position={[0.95, 0.2, 0]} 
              rotation={[0, 0, -0.5]}
            >
              <cylinderGeometry args={[0.26, 0.2, 1.5, 24]} />
              <meshStandardMaterial color={colors.sleeves} {...materialProps} />
            </mesh>

            {/* Hoodie Hood */}
            <mesh castShadow receiveShadow position={[0, 1.25, -0.15]}>
              <sphereGeometry args={[0.55, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.85]} />
              <meshStandardMaterial color={colors.collar} {...materialProps} />
            </mesh>

            {/* Bottom Hem (Ribbed) */}
            <mesh castShadow position={[0, -0.92, 0]}>
              <cylinderGeometry args={[0.905, 0.905, 0.15, 32]} />
              <meshStandardMaterial color={colors.hem} roughness={0.9} metalness={0.1} />
            </mesh>

            {/* Left Cuff */}
            <mesh position={[-1.3, -0.42, 0]} rotation={[0, 0, 0.5]}>
              <cylinderGeometry args={[0.205, 0.205, 0.12, 16]} />
              <meshStandardMaterial color={colors.hem} roughness={0.9} />
            </mesh>

            {/* Right Cuff */}
            <mesh position={[1.3, -0.42, 0]} rotation={[0, 0, -0.5]}>
              <cylinderGeometry args={[0.205, 0.205, 0.12, 16]} />
              <meshStandardMaterial color={colors.hem} roughness={0.9} />
            </mesh>

            {/* Decal */}
            {customState.decal && logoTexture && (
              <mesh position={[0, 0.35, 0.01]}>
                <planeGeometry args={[1.5, 1.5]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                
                <Decal
                  position={[customState.decalPosition?.x || 0, customState.decalPosition?.y || 0, 0.8]}
                  rotation={[0, 0, 0]}
                  scale={[customState.decalScale || 0.35, customState.decalScale || 0.35, 1]}
                >
                  <meshBasicMaterial
                    map={logoTexture}
                    transparent
                    polygonOffset
                    polygonOffsetFactor={-10}
                    depthWrite={true}
                  />
                </Decal>
              </mesh>
            )}
          </group>
        ) : (
          /* Custom Procedural T-Shirt Model */
          <group>
            {/* Body */}
            <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.78, 0.82, 1.9, 32, 1, true]} />
              <meshStandardMaterial color={colors.body} {...materialProps} />
            </mesh>

            {/* Collar Trim */}
            <mesh castShadow position={[0, 1.11, 0]}>
              <torusGeometry args={[0.42, 0.035, 12, 32]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color={colors.collar} roughness={0.9} />
            </mesh>

            {/* Left Sleeve */}
            <mesh 
              castShadow 
              receiveShadow 
              position={[-0.85, 0.75, 0]} 
              rotation={[0, 0, 0.6]}
            >
              <cylinderGeometry args={[0.28, 0.26, 0.7, 24]} />
              <meshStandardMaterial color={colors.sleeves} {...materialProps} />
            </mesh>

            {/* Right Sleeve */}
            <mesh 
              castShadow 
              receiveShadow 
              position={[0.85, 0.75, 0]} 
              rotation={[0, 0, -0.6]}
            >
              <cylinderGeometry args={[0.28, 0.26, 0.7, 24]} />
              <meshStandardMaterial color={colors.sleeves} {...materialProps} />
            </mesh>

            {/* Bottom Hem Trim */}
            <mesh castShadow position={[0, -0.81, 0]}>
              <cylinderGeometry args={[0.825, 0.825, 0.08, 32]} />
              <meshStandardMaterial color={colors.hem} roughness={0.9} />
            </mesh>

            {/* Decal */}
            {customState.decal && logoTexture && (
              <mesh position={[0, 0.45, 0.01]}>
                <planeGeometry args={[1.5, 1.5]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                
                <Decal
                  position={[customState.decalPosition?.x || 0, customState.decalPosition?.y || 0, 0.8]}
                  rotation={[0, 0, 0]}
                  scale={[customState.decalScale || 0.35, customState.decalScale || 0.35, 1]}
                >
                  <meshBasicMaterial
                    map={logoTexture}
                    transparent
                    polygonOffset
                    polygonOffsetFactor={-10}
                    depthWrite={true}
                  />
                </Decal>
              </mesh>
            )}
          </group>
        )}

      </group>
    </group>
  );
}

// Preload the realistic model asset
useGLTF.preload('/shirt_baked.glb');
