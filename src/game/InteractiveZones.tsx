import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import config from '../data/config';
import * as THREE from 'three';

interface InteractiveZonesProps {
  onEnter: (zone: any) => void;
}

export default function InteractiveZones({ onEnter }: InteractiveZonesProps) {
  const zones = [
    {
      id: 'projects',
      position: [25, 0, -20],
      title: 'PROJECTS',
      color: '#00ffff',
      icon: '🎮',
      data: config.projects,
    },
    {
      id: 'skills',
      position: [15, 0, 15],
      title: 'SKILLS',
      color: '#ff6b6b',
      icon: '⚡',
      data: config.skills,
    },
    {
      id: 'about',
      position: [-20, 0, -20],
      title: 'ABOUT ME',
      color: '#ff00ff',
      icon: '👤',
      data: config.about,
    },
    {
      id: 'contact',
      position: [-15, 0, 20],
      title: 'CONTACT',
      color: '#76ff03',
      icon: '📧',
      data: config.contact,
    },
  ];

  return (
    <>
      {zones.map((zone) => (
        <InteractiveZone key={zone.id} {...zone} onEnter={onEnter} />
      ))}
    </>
  );
}

function InteractiveZone({ id, position, title, color, icon, data, onEnter }: any) {
  const zoneRef = useRef<THREE.Group>(null);
  const [isPlayerNear, setIsPlayerNear] = useState(false);
  const [rotation, setRotation] = useState(0);

  useFrame((state) => {
    if (!zoneRef.current) return;
    
    // Rotate the zone marker
    setRotation((prev) => prev + 0.01);
    
    // Check player distance (assuming player at camera position approximately)
    const camera = state.camera;
    const distance = zoneRef.current.position.distanceTo(camera.position);
    
    if (distance < 8 && !isPlayerNear) {
      setIsPlayerNear(true);
      onEnter({ id, title, data });
    } else if (distance >= 8 && isPlayerNear) {
      setIsPlayerNear(false);
    }
  });

  return (
    <group ref={zoneRef} position={position}>
      {/* Platform */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[4, 4, 0.2, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isPlayerNear ? 0.5 : 0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Holographic cylinder */}
      <mesh position={[0, 3, 0]} rotation={[0, rotation, 0]}>
        <cylinderGeometry args={[2, 2, 6, 32, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>
      
      {/* Pulsing ring */}
      <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, rotation * 2]}>
        <ringGeometry args={[3, 3.5, 32]} />
        <meshBasicMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          transparent
          opacity={isPlayerNear ? 0.8 : 0.4}
        />
      </mesh>
      
      {/* Floating icon */}
      <Billboard position={[0, 4, 0]}>
        <Text fontSize={2} color={color}>
          {icon}
        </Text>
      </Billboard>
      
      {/* Title */}
      <Billboard position={[0, 5.5, 0]}>
        <Text
          fontSize={0.6}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {title}
        </Text>
      </Billboard>
      
      {/* Interaction prompt */}
      {isPlayerNear && (
        <Billboard position={[0, 1, 0]}>
          <Text
            fontSize={0.4}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#000000"
          >
            Press E to interact
          </Text>
        </Billboard>
      )}
      
      {/* Light */}
      <pointLight position={[0, 4, 0]} color={color} intensity={isPlayerNear ? 50 : 20} distance={15} />
    </group>
  );
}
