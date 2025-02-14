import { useState, useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { CameraControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Portal } from "./Portal"; // Import the Portal component

export const Experience = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  // Define the number of portals dynamically set by user input)
  const numPortals = 3;;; // This can be updated by the Bash script or user input

  // Generate portal configurations dynamically
  const portalConfigurations = [];
  const spacing = 3; // Adjust the spacing between portals
  for (let i = 1; i <= numPortals; i++) {
    portalConfigurations.push({
      name: `Portal_${i}`, // Default name
      texture: null, // Default texture (can be a URL or null)
      position: [(i - Math.ceil(numPortals / 2)) * spacing, 0, 0], // Default position
      rotationY: 0, // Default rotation
    });
  }

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

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      {portalConfigurations.map((portal, index) => (
        <Portal
          key={index}
          name={portal.name}
          texture={portal.texture}
          position={portal.position}
          rotationY={portal.rotationY}
          active={active}
          setActive={setActive}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </>
  );
};