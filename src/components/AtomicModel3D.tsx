import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

/**
 * Bohr shell electron distribution.
 * Shell n holds max 2n² electrons.
 */
function getShellDistribution(electronCount: number): number[] {
  const shells: number[] = [];
  let remaining = electronCount;
  let n = 1;
  while (remaining > 0) {
    const maxInShell = 2 * n * n;
    const inThisShell = Math.min(remaining, maxInShell);
    shells.push(inThisShell);
    remaining -= inThisShell;
    n++;
  }
  return shells;
}

// ----- Nucleus -----

function Nucleus({ protons, neutrons }: { protons: number; neutrons: number }) {
  const total = protons + neutrons;
  const nucleusRadius = Math.max(0.3, Math.pow(total, 1 / 3) * 0.18);

  const nucleonPositions = useMemo(() => {
    const positions: { pos: THREE.Vector3; isProton: boolean }[] = [];
    for (let i = 0; i < Math.min(total, 80); i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / Math.min(total, 80));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = nucleusRadius * 0.7 * Math.pow(Math.random() * 0.3 + 0.7, 1 / 3);
      positions.push({
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ),
        isProton: i < Math.min(protons, Math.min(total, 80) * (protons / total)),
      });
    }
    return positions;
  }, [protons, neutrons, total, nucleusRadius]);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[nucleusRadius * 1.3, 16, 16]} />
        <meshBasicMaterial color="#ff6633" transparent opacity={0.12} />
      </mesh>
      {nucleonPositions.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[nucleusRadius * 0.2, 8, 8]} />
          <meshStandardMaterial
            color={n.isProton ? "#ff5555" : "#88aadd"}
            emissive={n.isProton ? "#ff3333" : "#4466aa"}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

// ----- Electron Shell Ring -----

function ShellRing({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return pts;
  }, [radius]);

  return (
    <Line points={points} color="#22d3ee" lineWidth={0.5} transparent opacity={0.15} />
  );
}

// ----- Orbiting Electrons -----

interface ElectronProps {
  shellRadius: number;
  index: number;
  totalInShell: number;
  shellIndex: number;
  speed: number;
}

/** Compute consistent tilt for a given shell index */
function getShellTilt(shellIndex: number): [number, number, number] {
  const tiltX = (shellIndex * 0.4) % Math.PI;
  const tiltY = 0;
  const tiltZ = (shellIndex * 0.7 + 0.3) % Math.PI;
  return [tiltX, tiltY, tiltZ];
}

function Electron({ shellRadius, index, totalInShell, shellIndex, speed }: ElectronProps) {
  const ref = useRef<THREE.Mesh>(null);
  const offsetAngle = (index / totalInShell) * Math.PI * 2;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offsetAngle;
    // Position on flat circle, parent group handles tilt
    ref.current.position.set(
      Math.cos(t) * shellRadius,
      0,
      Math.sin(t) * shellRadius
    );
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}

// ----- Scene Content -----

function AtomScene({ protons, neutrons, electrons }: { protons: number; neutrons: number; electrons: number }) {
  const shells = useMemo(() => getShellDistribution(electrons), [electrons]);
  const baseRadius = Math.max(0.5, Math.pow(protons + neutrons, 1 / 3) * 0.18) + 0.5;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-3, -3, 2]} intensity={0.5} color="#22d3ee" />

      {/* Nucleus */}
      <Nucleus protons={protons} neutrons={neutrons} />

      {/* Shells and electrons */}
      {shells.map((count, shellIdx) => {
        const radius = baseRadius + shellIdx * 0.8;
        const speed = 0.6 / (shellIdx + 1);
        const tilt = getShellTilt(shellIdx);
        return (
          <group key={shellIdx} rotation={tilt}>
            {/* Orbital ring — same group so it matches electron plane */}
            <ShellRing radius={radius} />

            {/* Electrons */}
            {Array.from({ length: count }, (_, i) => (
              <Electron
                key={`${shellIdx}-${i}`}
                shellRadius={radius}
                index={i}
                totalInShell={count}
                shellIndex={shellIdx}
                speed={speed}
              />
            ))}
          </group>
        );
      })}

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// ----- Main Export -----

interface AtomicModel3DProps {
  protons: number;
  neutrons: number;
  electrons: number;
}

const AtomicModel3D = ({ protons, neutrons, electrons }: AtomicModel3DProps) => {
  // Camera distance based on atom size
  const camDist = Math.max(4, Math.pow(protons + neutrons, 1 / 3) * 0.18 + electrons * 0.02 + 3);

  return (
    <div className="w-full aspect-square max-h-[280px] rounded-lg overflow-hidden bg-background/50 border border-border">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            Loading 3D model…
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, camDist * 0.5, camDist], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <AtomScene protons={protons} neutrons={neutrons} electrons={electrons} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default AtomicModel3D;
