import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Stage,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";

const Model = () => {
  const group = useRef();

  const { scene } = useGLTF("./potline.gltf");   
  const [hoveredMesh, setHoveredMesh] = useState(null);

  useFrame(() => {
    if (group.current) {
      group.current.traverse((child) => {
        if (child.isMesh) {
          if(child.name == "s1"){
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
    />
  );
};

const ThreeScene = () => {
  return (
    <div className="h-[500px]  bg-[rgba(16,16,16,0.9)] md:h-auto md:w-[75%] z-1 rounded-2xl  m-4">
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
      <ambientLight intensity={0.5} />

      <PresentationControls
        speed={1.5}
        global
      >
        <Stage environment={"warehouse"}>
          <Model />
        </Stage>
      </PresentationControls>
      <OrbitControls />
    </Canvas></div>
  );
};

export default ThreeScene;