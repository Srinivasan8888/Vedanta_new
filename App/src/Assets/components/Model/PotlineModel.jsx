import React, { useEffect, useState, useRef } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import debounce from 'lodash.debounce';
import up from '../../images/green-arrow.png';
import down from '../../images/red-arrow.png';

const PotlineModel = () => {
  const { scene } = useGLTF('/potline.gltf');
  const [hoveredObject, setHoveredObject] = useState(null);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const [info, setInfo] = useState({});
  const materialCache = useRef({});

  const nameMapping = {
    CBT1A2: 's1', CBT1A1: 's2', CBT2A2: 's3', CBT2A1: 's4',
    CBT3A2: 's5', CBT3A1: 's6', CBT4A2: 's7', CBT4A1: 's8',
    CBT5A2: 's9', CBT5A1: 's10', CBT6A2: 's11', CBT6A1: 's12',
    CBT7A2: 's13', CBT7A1: 's14', CBT8A2: 's15', CBT8A1: 's16',
    CBT9A2: 's17', CBT9A1: 's18', CBT10A2: 's19', CBT10A1: 's20',
    CBT11A2: 's21', CBT11A1: 's22', CBT12A2: 's23', CBT12A1: 's24',
    CBT13A2: 's25', CBT13A1: 's26', CBT14A2: 's27', CBT14A1: 's28',
    CBT15A2: 's29', CBT15A1: 's30', CBT16A2: 's31', CBT16A1: 's32',
    CBT17A2: 's33', CBT17A1: 's34', CBT18A2: 's35', CBT18A1: 's36',
    CBT19A2: 's37', CBT19A1: 's38', CBT20A2: 's39', CBT20A1: 's40',
    CBT21A2: 's41', CBT21A1: 's42', CBT22A2: 's43', CBT22A1: 's44',
    CBT23A2: 's45', CBT23A1: 's46', CBT24A2: 's47', CBT24A1: 's48',
    CBT25A2: 's49', CBT25A1: 's50', CBT26A2: 's51', CBT26A1: 's52',
    CBT27A2: 's53', CBT27A1: 's54', CBT1B2: 's55', CBT1B1: 's56',
    CBT2B2: 's57', CBT2B1: 's58', CBT3B2: 's59', CBT3B1: 's60',
    CBT4B2: 's61', CBT4B1: 's62', CBT5B2: 's63', CBT5B1: 's64',
    CBT6B2: 's65', CBT6B1: 's66', CBT7B2: 's67', CBT7B1: 's68',
    CBT8B2: 's69', CBT8B1: 's70', CBT9B2: 's71', CBT9B1: 's72',
    CBT10B2: 's73', CBT10B1: 's74', CBT11B2: 's75', CBT11B1: 's76',
    CBT12B2: 's77', CBT12B1: 's78', CBT13B2: 's79', CBT13B1: 's80',
    CBT14B2: 's81', CBT14B1: 's82', CBT15B2: 's83', CBT15B1: 's84',
    CBT16B2: 's85', CBT16B1: 's86', CBT17B2: 's87', CBT17B1: 's88',
    CBT18B2: 's89', CBT18B1: 's90', CBT19B2: 's91', CBT19B1: 's92',
    CBT20B2: 's93', CBT20B1: 's94', CBT21B2: 's95', CBT21B1: 's96',
    CBT22B2: 's97', CBT22B1: 's98', CBT23B2: 's99', CBT23B1: 's100',
    CBT24B2: 's101', CBT24B1: 's102', CBT25B2: 's103', CBT25B1: 's104',
    CBT26B2: 's105', CBT26B1: 's106', CBT27B2: 's107', CBT27B1: 's108',
  };

  const handleMouseMove = debounce((event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, 50);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://vedanta.xyma.live/sensor/getmodel");
  //       const infoVal = await response.json();
  //       setInfo(infoVal);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   // fetchData(); // Fetch initially
  //   const interval = setInterval(fetchData, 10000); 
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // raycasting to get the hovered object
  useFrame(({ camera }) => {
    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      const apiName = Object.keys(nameMapping).find(key => nameMapping[key] === intersectedObject.name);
      
      if (apiName && info[apiName]) {
        setHoveredObject(intersectedObject);
        setHoveredInfo({
          name: apiName,
          temperature: parseFloat(info[apiName]),
        });
      } else {
        setHoveredObject(null);
        setHoveredInfo(null);
      }
    } else {
      setHoveredObject(null);
      setHoveredInfo(null);
    }
  });

  // temeperature color change on the model according to the api data
  useEffect(() => {
    for (const [apiName, objectName] of Object.entries(nameMapping)) {
      const object = scene.getObjectByName(objectName);
      if (object) {
        const temperature = info[apiName] || 0;
        const color = temperature > 0 ? 0x4B88C5 : 0x00ff00;
        if (!materialCache.current[color]) {
          materialCache.current[color] = new THREE.MeshStandardMaterial({ color });
        }
        object.material = materialCache.current[color];
      }
    }
  }, [scene, info]);

  // hover effect on the model 
  useEffect(() => {
    if (hoveredObject) {
      hoveredObject.material.color.set(0x00ff00);
    }
    return () => {
      if (hoveredObject) {
        hoveredObject.material.color.set(0xff0000);
      }
    };
  }, [hoveredObject]);

  // dispose the model when the component unmounts

  useEffect(() => {
    return () => {
      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (object.material.isMaterial) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          }
        }
      });
    };
  }, [scene]);  

  return (
    <>
      <primitive object={scene} scale={1} />
      {/* {hoveredObject && hoveredInfo && (
        <Html position={[hoveredObject.position.x, hoveredObject.position.y, hoveredObject.position.z]}>
          <div
            className="w-[175.83px] h-[75.92px] absolute px-4 py-2 grid grid-cols-2 gap-2 shadow-md top-0 left-0 rounded-2xl border border-solid border-white [background:linear-gradient(180deg,rgba(16.28,16.28,16.28,0.8)_0%,rgba(0,115,255,0.64)_100%)] text-white"
           
          >
            <div className="mt-1 text-xs font-semibold">{hoveredInfo.name}</div>
            <div className="text-base font-bold">{hoveredInfo.temperature.toFixed(2)} °C</div>
            <div className="flex items-center text-[10px] font-medium">
              <img src={up} alt="down" className="w-4 h-4 mr-1" />
              {hoveredInfo.temperature + 20} °C
            </div>
            <div className="flex items-center text-[10px] font-medium">
              <img src={down} alt="up" className="w-4 h-4 mr-1" />
              {hoveredInfo.temperature - 20} °C
            </div>
          </div>
        </Html>
      )} */}
      {hoveredObject && hoveredInfo && (
        <Html position={[hoveredObject.position.x, hoveredObject.position.y, hoveredObject.position.z]}>
          <div className="popup">
            <div className="stick"></div>
            <div className="flag">
              <div className="name">{hoveredInfo.name}</div>
              <div className="value">temperature: {hoveredInfo.temperature.toFixed(2)} ℃</div>
            </div>
          </div>
        </Html>
      )}
    </>
  );
};

export default PotlineModel;
