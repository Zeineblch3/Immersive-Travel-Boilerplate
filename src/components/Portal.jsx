import { useFrame } from "@react-three/fiber";
import { MeshPortalMaterial, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export const Portal = ({
  name,
  active,
  setActive,
  hovered,
  setHovered,
  portalSize = [2, 3, 0.1],
  texture = null,
  color = "white", // Default fallback color
  rotationY = 0,
  ...props
}) => {
  const portalMaterial = useRef();
  const map = texture ? useTexture(texture) : null;

  
  // Smooth transition for the portal effect
  useFrame(() => {
    const worldOpen = active === name;
    if (portalMaterial.current) {
      portalMaterial.current.blend = worldOpen ? 1 : 0;
    }
  });

  return (
    <group {...props} rotation={[0, rotationY, 0]}>
      <RoundedBox
        name={name}
        args={portalSize}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
        {map ? (
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          ) : (
            <meshStandardMaterial color={color} side={THREE.BackSide} />
          )}
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};