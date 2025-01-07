import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  // Stage,
  OrbitControls,
  // PresentationControls,
  PerspectiveCamera,
  Html,
} from "@react-three/drei";
import { Ray } from "three";
import * as THREE from "three";
import down from "../../Assets/images/red-arrow.png";
import up from "../../Assets/images/green-arrow.png";

const Model = () => {
  const group = useRef();
  const { scene } = useGLTF("./potline.gltf");
  const [hoveredMesh, setHoveredMesh] = useState(null);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [popupPosition, setPopupPosition] = useState({
    x: 0,
    y: 0,
    show: false,
  });
  const mouse = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const lastUpdate = useRef(0);

  const nameMapping = {
    CBT1A2: "s1",
    CBT1A1: "s2",
    CBT2A2: "s3",
    CBT2A1: "s4",
    CBT3A2: "s5",
    CBT3A1: "s6",
    CBT4A2: "s7",
    CBT4A1: "s8",
    CBT5A2: "s9",
    CBT5A1: "s10",
    CBT6A2: "s11",
    CBT6A1: "s12",
    CBT7A2: "s13",
    CBT7A1: "s14",
    CBT8A2: "s15",
    CBT8A1: "s16",
    CBT9A2: "s17",
    CBT9A1: "s18",
    CBT10A2: "s19",
    CBT10A1: "s20",
    CBT11A2: "s21",
    CBT11A1: "s22",
    CBT12A2: "s23",
    CBT12A1: "s24",
    CBT13A2: "s25",
    CBT13A1: "s26",
    CBT14A2: "s27",
    CBT14A1: "s28",
    CBT15A2: "s29",
    CBT15A1: "s30",
    CBT16A2: "s31",
    CBT16A1: "s32",
    CBT17A2: "s33",
    CBT17A1: "s34",
    CBT18A2: "s35",
    CBT18A1: "s36",
    CBT19A2: "s37",
    CBT19A1: "s38",
    CBT20A2: "s39",
    CBT20A1: "s40",
    CBT21A2: "s41",
    CBT21A1: "s42",
    CBT22A2: "s43",
    CBT22A1: "s44",
    CBT23A2: "s45",
    CBT23A1: "s46",
    CBT24A2: "s47",
    CBT24A1: "s48",
    CBT25A2: "s49",
    CBT25A1: "s50",
    CBT26A2: "s51",
    CBT26A1: "s52",
    CBT27A2: "s53",
    CBT27A1: "s54",
    CBT1B2: "s55",
    CBT1B1: "s56",
    CBT2B2: "s57",
    CBT2B1: "s58",
    CBT3B2: "s59",
    CBT3B1: "s60",
    CBT4B2: "s61",
    CBT4B1: "s62",
    CBT5B2: "s63",
    CBT5B1: "s64",
    CBT6B2: "s65",
    CBT6B1: "s66",
    CBT7B2: "s67",
    CBT7B1: "s68",
    CBT8B2: "s69",
    CBT8B1: "s70",
    CBT9B2: "s71",
    CBT9B1: "s72",
    CBT10B2: "s73",
    CBT10B1: "s74",
    CBT11B2: "s75",
    CBT11B1: "s76",
    CBT12B2: "s77",
    CBT12B1: "s78",
    CBT13B2: "s79",
    CBT13B1: "s80",
    CBT14B2: "s81",
    CBT14B1: "s82",
    CBT15B2: "s83",
    CBT15B1: "s84",
    CBT16B2: "s85",
    CBT16B1: "s86",
    CBT17B2: "s87",
    CBT17B1: "s88",
    CBT18B2: "s89",
    CBT18B1: "s90",
    CBT19B2: "s91",
    CBT19B1: "s92",
    CBT20B2: "s93",
    CBT20B1: "s94",
    CBT21B2: "s95",
    CBT21B1: "s96",
    CBT22B2: "s97",
    CBT22B1: "s98",
    CBT23B2: "s99",
    CBT23B1: "s100",
    CBT24B2: "s101",
    CBT24B1: "s102",
    CBT25B2: "s103",
    CBT25B1: "s104",
    CBT26B2: "s105",
    CBT26B1: "s106",
    CBT27B2: "s107",
    CBT27B1: "s108",
  };

  const reverseNameMapping = Object.fromEntries(
    Object.entries(nameMapping).map(([key, value]) => [value, key])
  );

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Get the canvas element's bounding rect
      const canvas = document.querySelector("canvas");
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      // Calculate mouse position relative to the canvas
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update popup position using screen coordinates
      if (hoveredMesh) {
        setPopupPosition({
          x: event.clientX,
          y: event.clientY,
          show: true,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hoveredMesh]);

  const handleClick = (e) => {
    e.stopPropagation();
    const partName = reverseNameMapping[e.object.name];

    if (partName) {
      setHoveredMesh(partName);
      console.log(`Clicked on: ${partName}`);
    }
  };

  useFrame(({ camera, clock }) => {
    if (!group.current) return;

    // Add debouncing to prevent too frequent updates
    const currentTime = clock.getElapsedTime();
    if (currentTime - lastUpdate.current < 0.05) return; // 50ms debounce
    lastUpdate.current = currentTime;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObject(group.current, true);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      const partName = reverseNameMapping[object.name];

      if (partName && partName !== hoveredMesh) {
        // setHoveredMesh(partName);
        setHoveredMesh(object);
        setHoveredInfo({
          name: partName,
          value: "320°C",
        });
        console.log("Hovering:", partName);
      }
    } else if (hoveredMesh) {
      setHoveredMesh(null);
      setPopupPosition((prev) => ({ ...prev, show: false }));
    }
  });

  return (
    <>
      <primitive
        ref={group}
        object={scene}
        // onClick={handleClick}

        position={[0, -2, 0]}
        scale={1}
      />
      {popupPosition.show && hoveredMesh && hoveredInfo && (
        <Html
          position={[
            hoveredMesh.position.x,
            hoveredMesh.position.y,
            hoveredMesh.position.z,
          ]}
        >
          <div className="relative text-white pointer-events-none">
            <div className="w-[159px] h-[79.50px] ml-1 bg-gradient-to-t from-[#101010cc] to-[#0073FFA3] rounded-2xl border border-white grid grid-cols-2 place-items-center">
              <div className="w-full text-xs font-semibold text-center">
                {hoveredInfo.name}
              </div>
              <div className="w-full text-base font-bold text-center">
                {hoveredInfo.value}
              </div>
              <div className="h-[17px] flex items-center justify-center gap-2.5 w-full">
                <img src={up} alt="up" className="w-[17px] h-[17px]" />
                <div className="text-white text-[11px] font-medium">
                  686°C
                </div>
              </div>
              <div className="h-[17px] flex items-center justify-center gap-2.5 w-full">
                <img src={down} alt="up" className="w-[17px] h-[17px]" />
                <div className="text-white text-[11px] font-medium">
                  146°C
                </div>
              </div>
            </div>
            {/* <div className="w-2.5 h-[60px] relative">
              <div className="w-[53px] h-[1px] left-[3px] top-[42px] rounded-xl absolute origin-top-left -rotate-90 bg-white border-2 border-white"></div>
            </div> */}
          </div>
        </Html>
      )}
    </>
  );
};

const ThreeModel = () => {
  const controlsRef = useRef();
  return (
    <div className="h-[500px]  bg-[rgba(16,16,16,0.9)] md:h-auto md:w-[75%] z-1 rounded-2xl  m-4">
      <div className="absolute z-10 flex items-center justify-center p-4">
        <div className="flex w-full gap-4">
          <button
            type="button"
            class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 m-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <p className="flex items-center justify-center text-2xl font-semibold text-white ">
            1908
          </p>
          <button
            type="button"
            class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 m-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* <div className="z-30 items-center justify-center text-2xl font-medium text-white lex absolu">1908</div> */}

      {/* <Canvas style={{ width: "100%", height: "90vh" }}> */}
        <Canvas >
        <ambientLight intensity={2} />
        <directionalLight position={[1, 5, 5]} intensity={2} />
        <PerspectiveCamera makeDefault position={[18, 1, 0]} />
        <Model />
        <OrbitControls
          ref={controlsRef}
          minDistance={10}
          maxDistance={18}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default ThreeModel;
