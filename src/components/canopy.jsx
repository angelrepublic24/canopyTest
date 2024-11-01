/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function Canopy() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Configurar la escena, la cámara y el renderizador
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f3f3);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Añadir controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Cargar el modelo GLB y escalar el ancho
    const loader = new GLTFLoader();
    const newWidthScale = 0.8; // Ajusta el factor de escala según el ancho deseado
    loader.load('/8ft.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(1, 1, newWidthScale); // Escalar el ancho en el eje X
      scene.add(model);
    });

    // Luz básica para iluminar el modelo
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xcccccc, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Limpiar el renderizador al desmontar el componente
    return () => {
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
}
