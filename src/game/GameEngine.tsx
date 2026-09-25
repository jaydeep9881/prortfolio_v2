import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { KeyboardControls } from '@react-three/drei';
import Player from './Player';
import CityEnvironment from './CityEnvironment';
import Vehicles from './Vehicles';
import InteractiveZones from './InteractiveZones';
import { Suspense } from 'react';

export enum Controls {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  jump = 'jump',
  sprint = 'sprint',
  interact = 'interact',
  enterVehicle = 'enterVehicle',
}

const controlsMap = [
  { name: Controls.forward, keys: ['KeyW', 'ArrowUp'] },
  { name: Controls.backward, keys: ['KeyS', 'ArrowDown'] },
  { name: Controls.left, keys: ['KeyA', 'ArrowLeft'] },
  { name: Controls.right, keys: ['KeyD', 'ArrowRight'] },
  { name: Controls.jump, keys: ['Space'] },
  { name: Controls.sprint, keys: ['ShiftLeft', 'ShiftRight'] },
  { name: Controls.interact, keys: ['KeyE'] },
  { name: Controls.enterVehicle, keys: ['KeyF'] },
];

interface GameEngineProps {
  onZoneEnter: (zone: any) => void;
}

export default function GameEngine({ onZoneEnter }: GameEngineProps) {
  return (
    <KeyboardControls map={controlsMap}>
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#0a0e1a']} />
          <fog attach="fog" args={['#0a0e1a', 10, 100]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[50, 50, 25]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />
          
          <Physics gravity={[0, -20, 0]}>
            <Player />
            <CityEnvironment />
            <Vehicles />
            <InteractiveZones onEnter={onZoneEnter} />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}
