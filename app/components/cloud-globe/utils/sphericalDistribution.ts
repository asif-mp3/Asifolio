import * as THREE from "three";

/**
 * Generate evenly distributed points on a sphere using the Fibonacci spiral algorithm
 * with depth variance for volumetric effect
 */
export function fibonacciSphere(
  count: number,
  radius: number,
  depthVariance: number = 0.15
): Float32Array {
  const positions = new Float32Array(count * 3);
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

  for (let i = 0; i < count; i++) {
    // Y coordinate from -1 to 1
    const y = 1 - (i / (count - 1)) * 2;

    // Radius at this Y position
    const radiusAtY = Math.sqrt(1 - y * y);

    // Golden angle increment
    const theta = phi * i;

    // Add depth variance for volumetric effect
    // 30% inside (0.85-0.95), 50% surface (1.0-1.05), 20% outside (1.1-1.2)
    let depthMultiplier: number;
    const rand = Math.random();
    if (rand < 0.3) {
      // Inside the cloud
      depthMultiplier = 0.85 + Math.random() * 0.1;
    } else if (rand < 0.8) {
      // On the surface
      depthMultiplier = 1.0 + Math.random() * 0.05;
    } else {
      // Outside, more prominent
      depthMultiplier = 1.1 + Math.random() * 0.1;
    }

    const r = radius * depthMultiplier;

    positions[i * 3] = Math.cos(theta) * radiusAtY * r;     // X
    positions[i * 3 + 1] = y * r;                            // Y
    positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * r; // Z
  }

  return positions;
}

/**
 * Get a single position as Vector3 from the positions array
 */
export function getPositionAt(positions: Float32Array, index: number): THREE.Vector3 {
  return new THREE.Vector3(
    positions[index * 3],
    positions[index * 3 + 1],
    positions[index * 3 + 2]
  );
}

/**
 * Sort indices by theta angle for logical keyboard navigation order
 */
export function getSortedIndicesByTheta(positions: Float32Array, count: number): number[] {
  const indices = Array.from({ length: count }, (_, i) => i);

  return indices.sort((a, b) => {
    const thetaA = Math.atan2(positions[a * 3 + 2], positions[a * 3]);
    const thetaB = Math.atan2(positions[b * 3 + 2], positions[b * 3]);
    return thetaA - thetaB;
  });
}

/**
 * Calculate the depth factor for a node (used for opacity/scale based on position)
 * Nodes deeper in the cloud appear smaller/fainter
 */
export function getDepthFactor(position: THREE.Vector3, baseRadius: number): number {
  const distance = position.length();
  const normalizedDepth = distance / baseRadius;

  // Nodes at radius 0.85 get factor 0.6, at 1.2 get factor 1.0
  return THREE.MathUtils.mapLinear(normalizedDepth, 0.85, 1.2, 0.6, 1.0);
}
