import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const Scene3D = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesGeometryRef = useRef<THREE.BufferGeometry>(null);

  useFrame((state) => {
    if (!particlesRef.current || !particlesGeometryRef.current) return;

    const positions = particlesGeometryRef.current.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time + positions[i]) * 0.002;
      positions[i] += Math.cos(time + positions[i + 1]) * 0.002;
    }

    particlesGeometryRef.current.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.05;
  });

  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <points ref={particlesRef}>
        <bufferGeometry ref={particlesGeometryRef}>
          <float32BufferAttribute
            attach="attributes-position"
            count={2000}
            array={new Float32Array(6000).map(() => (Math.random() - 0.5) * 10)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#ffffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      <mesh position={[0, 0, -5]}>
        <torusGeometry args={[3, 0.2, 16, 100]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
    </>
  );
};

export default Scene3D;
