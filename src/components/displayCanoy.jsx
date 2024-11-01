import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

const CameraPositionLogger = () => {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  // useFrame(() => {
  //   console.log(`X: ${cameraRef.current.position.x}, Y: ${cameraRef.current.position.y}, Z: ${cameraRef.current.position.z}`);
  // });

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  return null;
};
const Model = ({ modelPath, rotation, newWidthScale , onModelLoaded }) => {
  const gltfLoader = new GLTFLoader();
  gltfLoader.setMeshoptDecoder(MeshoptDecoder); // Configura el decodificador de Meshopt

  const gltf = useLoader(GLTFLoader, modelPath, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  }); // Carga el modelo

  // Escala y rotación del modelo
  gltf.scene.scale.set(1, 1, newWidthScale );
  if (rotation) {
    gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
  } else {
    gltf.scene.rotation.x = Math.PI / 0.5; // Rotación por defecto
    gltf.scene.rotation.y = Math.PI;
  }

  // Mantener los materiales y texturas originales
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true; // Habilitar sombra
      child.receiveShadow = true; // Recibir sombra
    }
  });

  useEffect(() => {
    if (onModelLoaded) {
      onModelLoaded(gltf.scene);
    }
  }, [gltf, onModelLoaded]);

  return <primitive object={gltf.scene} />;
};

const RotationControls = ({ model }) => {
    const controlsRef = useRef();
    const { camera } = useThree();
  
    useEffect(() => {
      if (model && controlsRef.current) {
        // Calcula el centro del modelo
        const boundingBox = new THREE.Box3().setFromObject(model);
        const center = boundingBox.getCenter(new THREE.Vector3());
  
        // Establece el punto objetivo de los controles en el centro del modelo
        controlsRef.current.target.copy(center);
        camera.position.set(center.x + 15, center.y + 10, camera.position.z); // Opcional: Ajusta la posición inicial de la cámara
        controlsRef.current.update();
      }
    }, [model, camera]);
  
    return (
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        minDistance={40}
        maxDistance={50}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.PAN,
          RIGHT: THREE.MOUSE.ROTATE,
        }}
      />
    );
  };
export const CustomCanopy = ({
  sizeOption,
  lengthSideOption,
  slotTopOption,
  slotBottomOption,
  roofOption,
  louversOption,
  louverSizeOption

}) => {
  const [modelPath, setModelPath] = useState("");
  const [model, setModel] = useState(null);
  const [newWidthScale, setNewWidthScale] = useState(0.8);
  const [cameraPosition, setCameraPosition] = useState([4.69, -10.39, -40.05]);
  const [controlsTarget, setControlsTarget] = useState(
    new THREE.Vector3(0, 0, 0)
  );
  const [rotation, setRotation] = useState(null); // Rotación opcional

  const cameraRef = useRef();

  useEffect(() => {
    let newPath = "";
    let newCameraPosition = [-6.6851, 17.0991, 81.73998];
    let newControlsTarget = new THREE.Vector3(2, 5, 47);
    let newRotation = { x: Math.PI / 0.5, y: Math.PI, z: 0 };
    setModelPath('8ft.glb')

    if (sizeOption && !lengthSideOption) {
      switch (sizeOption) {
        case "1 ft":
            newCameraPosition = [10, 15, 50];
            newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(0.1);
            break;
          case "2 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(0.2);
            break;
          case "3 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(0.3);
            break;
          case "4 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(0.4);
            break;
          case "5 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(0.5);
            break;
          case "6 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(0.6);
            break;
          case "7 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(0.7);
            break;
          case "8 ft":
            newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
            setNewWidthScale(0.8);
            
            break;
          case "9 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(0.9);
            break;
          case "10 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(1.0);
            break;
          case "11 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(1.1);
            break;
          case "12 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(1.2);
            break;
          case "13 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(1.3);
            break;
          case "14 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(1.4);
            break;
          case "15 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(1.5);
            break;
          case "16 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(1.6);
            break;
          case "17 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(1.7);
            break;
          case "18 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(1.8);
            break;
          case "19 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(1.9);
            break;
          case "20 ft":
            newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
            setNewWidthScale(2.0);
            break;
      }
    }

    // if (sizeOption && lengthSideOption) {
    //   // Convertimos los valores a números pares redondeando hacia arriba
    //   const adjustedSize = Math.ceil(parseInt(sizeOption) / 2) * 2;
    //   const adjustedLength = Math.ceil(parseInt(lengthSideOption) / 2) * 2;
    
    //   // Definimos el path usando los valores ajustados
    //   newPath = `images/completSize/${adjustedSize}x${adjustedLength}.glb`;
    //   newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
    // }

    // // Slot Top
    // if (sizeOption && lengthSideOption && slotTopOption) {
    //   // Convertimos los valores a números pares redondeando hacia arriba
    //   const adjustedSize = Math.ceil(parseInt(sizeOption) / 2) * 2;
    //   const adjustedLength = Math.ceil(parseInt(lengthSideOption) / 2) * 2;
    //   if(slotTopOption === 'None') {
    //     newPath = `images/completSize/${adjustedSize}x${adjustedLength}.glb`;
    //   }else{
    //     newPath = `images/slotTop/${slotTopOption}/${adjustedSize}x${adjustedLength}.glb`;
    //     newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
    //   }
          
    // }




 

    // setModelPath(newPath);
    setCameraPosition(newCameraPosition);
    setControlsTarget(newControlsTarget);
    setRotation(newRotation);
  }, [
    sizeOption,
    lengthSideOption,
    slotTopOption,
    slotBottomOption,
    roofOption,
    louversOption,
    louverSizeOption
  ]);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...cameraPosition);
    }
  }, [cameraPosition]);

  const handleModelLoaded = (loadedModel) => {
    setModel(loadedModel);
  };
  return (
    <div className="border md:rounded-3xl bg-white w-full z-10 md:z-0  md:w-3/5 fixed h-[55vh] md:h-[80vh]">
      <Canvas
        className="border md:rounded-3xl bg-white w-full md:w-3/4"
        camera={{ position: cameraPosition, fov: 25 }}
        style={{ height: "100%", background: "#d3d3d3" }}
      >
        <CameraPositionLogger />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight
          position={[1, 10, 10]}
          angle={0.15}
          penumbra={4}
          intensity={1}
          castShadow
        />
        {modelPath && (
          <Model
            modelPath={modelPath}
            rotation={rotation}
            newWidthScale={newWidthScale}
          />
        )}
         <RotationControls model={model} />
      </Canvas>
    </div>
  );
};