import { useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Text } from '@react-three/drei';

export default function Vehicles() {
  const vehicles = [
    { id: 'car1', position: [10, 0.5, -5], type: 'car', color: '#ff1744' },
    { id: 'car2', position: [-15, 0.5, 10], type: 'car', color: '#00e5ff' },
    { id: 'bike1', position: [5, 0.5, 12], type: 'bike', color: '#ffd600' },
    { id: 'car3', position: [-25, 0.5, -10], type: 'car', color: '#76ff03' },
  ];

  return (
    <>
      {vehicles.map((vehicle) => (
        <Vehicle key={vehicle.id} {...vehicle} />
      ))}
    </>
  );
}

function Vehicle({ position, type, color }: any) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <RigidBody type="dynamic" colliders="cuboid" mass={type === 'bike' ? 50 : 200}>
        {type === 'car' ? (
          <>
            {/* Car body */}
            <mesh
              castShadow
              position={[0, 0.5, 0]}
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={() => setHovered(false)}
            >
              <boxGeometry args={[2, 1, 4]} />
              <meshStandardMaterial
                color={color}
                emissive={hovered ? color : '#000000'}
                emissiveIntensity={hovered ? 0.3 : 0}
              />
            </mesh>
            
            {/* Car top */}
            <mesh castShadow position={[0, 1.2, -0.3]}>
              <boxGeometry args={[1.8, 0.8, 2]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Wheels */}
            {[
              [0.9, 0, 1.3],
              [-0.9, 0, 1.3],
              [0.9, 0, -1.3],
              [-0.9, 0, -1.3],
            ].map((pos, idx) => (
              <mesh key={idx} position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
            ))}
            
            {/* Headlights */}
            <mesh position={[0.6, 0.5, 2.1]}>
              <sphereGeometry args={[0.15]} />
              <meshBasicMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={2} />
            </mesh>
            <mesh position={[-0.6, 0.5, 2.1]}>
              <sphereGeometry args={[0.15]} />
              <meshBasicMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={2} />
            </mesh>
            <pointLight position={[0, 0.5, 2.5]} color="#ffff00" intensity={20} distance={10} />
          </>
        ) : (
          <>
            {/* Bike */}
            <mesh
              castShadow
              position={[0, 0.6, 0]}
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={() => setHovered(false)}
            >
              <boxGeometry args={[0.6, 0.8, 2]} />
              <meshStandardMaterial
                color={color}
                emissive={hovered ? color : '#000000'}
                emissiveIntensity={hovered ? 0.3 : 0}
              />
            </mesh>
            
            {/* Wheels */}
            <mesh position={[0, 0.3, 0.8]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.35, 0.35, 0.15, 16]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0, 0.3, -0.8]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.35, 0.35, 0.15, 16]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          </>
        )}
      </RigidBody>
      
      {/* Interaction prompt */}
      {hovered && (
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Press F to enter
        </Text>
      )}
    </group>
  );
}
