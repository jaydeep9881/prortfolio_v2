import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import * as THREE from 'three';
import { Controls } from './GameEngine';

export default function Player() {
  const playerRef = useRef<any>();
  const { camera } = useThree();
  const [, get] = useKeyboardControls<Controls>();
  
  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  useFrame((state, delta) => {
    if (!playerRef.current) return;

    const { forward, backward, left, right, jump, sprint } = get();
    
    // Get current velocity
    const velocity = playerRef.current.linvel();
    
    // Movement
    const speed = sprint ? 8 : 5;
    const direction = new THREE.Vector3();
    
    if (forward) direction.z -= 1;
    if (backward) direction.z += 1;
    if (left) direction.x -= 1;
    if (right) direction.x += 1;
    
    direction.normalize();
    
    // Apply camera rotation to movement direction
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    const angle = Math.atan2(cameraDirection.x, cameraDirection.z);
    direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    
    // Set velocity
    playerRef.current.setLinvel({
      x: direction.x * speed,
      y: velocity.y,
      z: direction.z * speed,
    }, true);
    
    // Jump
    if (jump && Math.abs(velocity.y) < 0.1) {
      playerRef.current.setLinvel({ x: velocity.x, y: 8, z: velocity.z }, true);
    }
    
    // Camera follow
    const playerPosition = playerRef.current.translation();
    
    // Third-person camera position
    const cameraOffset = new THREE.Vector3(0, 4, 8);
    const cameraPosition = new THREE.Vector3(
      playerPosition.x + cameraOffset.x,
      playerPosition.y + cameraOffset.y,
      playerPosition.z + cameraOffset.z
    );
    
    const targetPosition = new THREE.Vector3(
      playerPosition.x,
      playerPosition.y + 1.5,
      playerPosition.z
    );
    
    // Smooth camera movement
    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(targetPosition, 5 * delta);
    
    camera.position.copy(smoothedCameraPosition);
    camera.lookAt(smoothedCameraTarget);
  });

  return (
    <RigidBody
      ref={playerRef}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[0, 5, 0]}
      enabledRotations={[false, false, false]}
      linearDamping={0.5}
    >
      <CapsuleCollider args={[0.75, 0.5]} />
      
      {/* Player visual representation */}
      <mesh castShadow position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 1.5]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      
      {/* Head */}
      <mesh castShadow position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.4]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
    </RigidBody>
  );
}
