import { RigidBody } from '@react-three/rapier';

export default function CityEnvironment() {
  return (
    <group>
      {/* Ground */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh receiveShadow position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#2a2a3e" />
        </mesh>
      </RigidBody>

      {/* Grid lines for streets */}
      <GridLines />
      
      {/* Buildings */}
      <Buildings />
      
      {/* Neon signs and decorations */}
      <NeonSigns />
      
      {/* Palm trees */}
      <PalmTrees />
      
      {/* Street lights */}
      <StreetLights />
    </group>
  );
}

function GridLines() {
  return (
    <group position={[0, 0.01, 0]}>
      {Array.from({ length: 20 }).map((_, i) => (
        <group key={i}>
          <mesh position={[i * 10 - 95, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.2, 200]} />
            <meshBasicMaterial color="#4a4a6e" />
          </mesh>
          <mesh position={[0, 0, i * 10 - 95]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[200, 0.2]} />
            <meshBasicMaterial color="#4a4a6e" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Buildings() {
  const buildingPositions = [
    // Downtown cluster
    { pos: [-20, 0, -20], size: [8, 25, 8], color: '#1a1a2e' },
    { pos: [-30, 0, -15], size: [6, 18, 6], color: '#16213e' },
    { pos: [-35, 0, -25], size: [7, 22, 7], color: '#0f1724' },
    { pos: [-15, 0, -30], size: [10, 30, 10], color: '#1a1a2e' },
    
    // Right side
    { pos: [25, 0, -20], size: [8, 20, 8], color: '#16213e' },
    { pos: [30, 0, -10], size: [6, 15, 6], color: '#1a1a2e' },
    { pos: [35, 0, -25], size: [7, 18, 7], color: '#0f1724' },
    
    // Near player spawn
    { pos: [15, 0, 15], size: [6, 12, 6], color: '#16213e' },
    { pos: [-15, 0, 20], size: [5, 10, 5], color: '#1a1a2e' },
    
    // Far buildings
    { pos: [40, 0, 40], size: [8, 16, 8], color: '#0f1724' },
    { pos: [-40, 0, 35], size: [7, 14, 7], color: '#16213e' },
  ];

  return (
    <>
      {buildingPositions.map((building, idx) => (
        <RigidBody key={idx} type="fixed" colliders="cuboid">
          <mesh
            castShadow
            receiveShadow
            position={[building.pos[0], building.size[1] / 2, building.pos[2]]}
          >
            <boxGeometry args={building.size as [number, number, number]} />
            <meshStandardMaterial color={building.color} />
          </mesh>
          
          {/* Windows */}
          <group position={[building.pos[0], building.size[1] / 2, building.pos[2]]}>
            {Array.from({ length: Math.floor(building.size[1] / 3) }).map((_, floor) => (
              <group key={floor}>
                <mesh position={[building.size[0] / 2 + 0.01, (floor * 3) - building.size[1] / 2 + 2, 0]}>
                  <planeGeometry args={[0.1, 0.8]} />
                  <meshBasicMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
                </mesh>
                <pointLight
                  position={[building.size[0] / 2 + 1, (floor * 3) - building.size[1] / 2 + 2, 0]}
                  color="#ffd700"
                  intensity={5}
                  distance={8}
                />
              </group>
            ))}
          </group>
        </RigidBody>
      ))}
    </>
  );
}

function NeonSigns() {
  return (
    <group>
      {/* Portfolio neon sign */}
      <mesh position={[-20, 15, -19.5]}>
        <boxGeometry args={[6, 2, 0.2]} />
        <meshBasicMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} />
      </mesh>
      <pointLight position={[-20, 15, -18]} color="#ff00ff" intensity={50} distance={20} />
      
      {/* Projects sign */}
      <mesh position={[25, 12, -19.5]}>
        <boxGeometry args={[5, 1.5, 0.2]} />
        <meshBasicMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
      </mesh>
      <pointLight position={[25, 12, -18]} color="#00ffff" intensity={40} distance={15} />
      
      {/* Skills sign */}
      <mesh position={[15, 8, 15.5]}>
        <boxGeometry args={[4, 1.5, 0.2]} />
        <meshBasicMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={2} />
      </mesh>
      <pointLight position={[15, 8, 16]} color="#ff6b6b" intensity={40} distance={15} />
    </group>
  );
}

function PalmTrees() {
  const treePositions = [
    [10, 0, 5], [-10, 0, 8], [15, 0, -5], [-12, 0, -8],
    [20, 0, 10], [-20, 0, 12], [25, 0, 5], [-25, 0, 7],
  ];

  return (
    <>
      {treePositions.map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]}>
          {/* Trunk */}
          <mesh position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 5]} />
            <meshStandardMaterial color="#5d4e37" />
          </mesh>
          {/* Leaves */}
          <mesh position={[0, 5.5, 0]}>
            <coneGeometry args={[2, 3, 8]} />
            <meshStandardMaterial color="#228b22" />
          </mesh>
        </group>
      ))}
    </>
  );
}

function StreetLights() {
  const lightPositions = [
    [8, 0, 0], [-8, 0, 0], [0, 0, 8], [0, 0, -8],
    [16, 0, 16], [-16, 0, 16], [16, 0, -16], [-16, 0, -16],
    [24, 0, 0], [-24, 0, 0], [0, 0, 24], [0, 0, -24],
  ];

  return (
    <>
      {lightPositions.map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]}>
          {/* Pole */}
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 6]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          {/* Light */}
          <mesh position={[0, 6, 0]}>
            <sphereGeometry args={[0.3]} />
            <meshBasicMaterial color="#ffff99" emissive="#ffff99" emissiveIntensity={1} />
          </mesh>
          <pointLight position={[0, 6, 0]} color="#ffff99" intensity={30} distance={15} />
        </group>
      ))}
    </>
  );
}
