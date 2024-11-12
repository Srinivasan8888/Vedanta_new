import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  // Stage,
  OrbitControls,
  // PresentationControls,
  PerspectiveCamera,
} from "@react-three/drei";

const Model = () => {
  const group = useRef();

  const { scene } = useGLTF("./potline.gltf");
  const [hoveredMesh, setHoveredMesh] = useState(null);

  useFrame(() => {
    if (group.current) {
      group.current.traverse((child) => {
        if (child.isMesh) {
          if (child.name == "s1") {
            console.log("mesh name=");
            child.material.color.set("green");
          }

        }
      });
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHoveredMesh(e.object.name);
    console.log(`Hovered over: ${e.object.name}`);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHoveredMesh(null);
  };

  return (
    <primitive
      ref={group}
      object={scene}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      position={[0, -2, 0]}
    />
  );
};

const ThreeScene = () => {
  const controlsRef = useRef();
  return (
    <div className="h-[500px]  bg-[rgba(16,16,16,0.9)] md:h-auto md:w-[75%] z-1 rounded-2xl  m-4">
      {/* <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
        <ambientLight intensity={0.5} />

        <PresentationControls
          speed={1.5}
          global
        >
          <Stage environment={"warehouse"}>
            
          </Stage>
        </PresentationControls>
        <OrbitControls />
      </Canvas> */}

      <Canvas>
        <ambientLight intensity={2} />
        <directionalLight position={[1, 5, 5]} intensity={2} />
        <PerspectiveCamera makeDefault position={[18, 1, 0]} />
        <Model />
        <OrbitControls
          ref={controlsRef}
          minDistance={18}
          maxDistance={28}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;