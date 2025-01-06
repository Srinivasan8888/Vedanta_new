import React from 'react';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import PotlineModel from './PotlineModel';

const ThreeScene = () => {
  const controlsRef = useRef();
  return (
    <Canvas style={{ width: '100%', height: '60vh' }}> 
      <ambientLight intensity={2} />
      <directionalLight position={[1, 5, 5]} intensity={2} />
      <PerspectiveCamera makeDefault position={[18, 1, 0]} />
      <PotlineModel />
      <OrbitControls 
      ref={controlsRef}
      minDistance={2}
      maxDistance={20}/>
    </Canvas>
  );
};

export default ThreeScene;