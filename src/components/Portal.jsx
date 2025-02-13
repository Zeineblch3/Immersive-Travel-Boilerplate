import { useFrame } from "@react-three/fiber";
import { MeshPortalMaterial, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export const Portal = ({
  name,
  active,
  setActive,
  hovered,
  setHovered,
  portalSize = [2, 3, 0.1],  // Default size of the portal
  portalColor = "#8ad6dd",  // Default portal color
  ...props
}) => {
  const portalMaterial = useRef();

  // Smooth transition for the portal effect
  useFrame((_state, delta) => {
    const worldOpen = active === name;
    portalMaterial.current && (portalMaterial.current.blend = worldOpen ? 1 : 0);
  });

  return (
    <group {...props}>
      {/* Portal object */}
      <RoundedBox
        name={name}
        args={portalSize}  // Set the portal size
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          {/* Basic material without texture */}
          <meshStandardMaterial color={portalColor} side={THREE.BackSide} />
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
