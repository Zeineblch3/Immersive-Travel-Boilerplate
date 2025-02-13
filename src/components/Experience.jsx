import { CameraControls, Environment } from "@react-three/drei"; 
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Portal } from './Portal'; // Import the Portal component

export const Experience = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  const numPortals = 1;;;;;  // This will be replaced with the user input

  // Handle camera movement when a portal is activated
  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active)?.getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active, scene]);

  const portals = [];
  const spacing = 3;  // Adjust the spacing between portals
  for (let i = 1; i <= numPortals; i++) {
    const positionX = (i - Math.ceil(numPortals / 2)) * spacing;  // Create space between portals
    portals.push(
      <Portal
        key={i}
        name={"Portal " + i}
        color={i % 2 === 0 ? "#dd8ad6" : "#8ad6dd"}
        texture={null}
        position={[positionX, 0, 0]}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      />
    );
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      {portals}
    </>
  );
};
