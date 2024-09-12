import * as THREE from 'three';

/**
 * The function for computing the bounding box of the given positions.
 *
 * @param {ArrayLike<number>} positions - The positions to compute the bounding box.
 * @returns {Box2} The bounding box.
 */
function bounds(positions: ArrayLike<number>): THREE.Box2 {
  const itemSize = 2;
  const box: THREE.Box2 = new THREE.Box2();
  if (positions[0] === undefined || positions[1] === undefined) return box;
  const count = positions.length / itemSize;
  box.min.set(positions[0], positions[1]);
  box.max.set(positions[0], positions[1]);
  for (let i = 0; i < count; i++) {
    const x = positions[i * itemSize + 0];
    const y = positions[i * itemSize + 1];
    if (x === undefined || y === undefined) continue;
    box.min.set(Math.min(x, box.min.x), Math.min(y, box.min.y));
    box.max.set(Math.max(x, box.max.x), Math.max(y, box.max.y));
  }
  return box;
}

/**
 * The function for computing the bounding box of the given positions.
 *
 * @param {ArrayLike<number>} positions - The positions to compute the bounding box.
 * @param {THREE.Box3} output - The output box.
 */
function computeBox(positions: ArrayLike<number>, output: THREE.Box3): void {
  const box = bounds(positions);
  // if (box.min.x === undefined || box.min.y === undefined || box.max.x === undefined || box.max.y === undefined) return;
  output.min.set(box.min.x, box.min.y, 0);
  output.max.set(box.max.x, box.max.y, 0);
}

/**
 * The function for computing the bounding sphere of the given positions.
 *
 * @param {ArrayLike<number>} positions - The positions to compute the bounding sphere.
 * @param {THREE.Sphere} output - The output sphere.
 */
function computeSphere(positions: ArrayLike<number>, output: THREE.Sphere): void {
  const box = bounds(positions);
  // if (box.min.x === undefined || box.min.y === undefined || box.max.x === undefined || box.max.y === undefined) return;
  const minX = box.min.x;
  const minY = box.min.y;
  const maxX = box.max.x;
  const maxY = box.max.y;
  const width = maxX - minX;
  const height = maxY - minY;
  const length = Math.sqrt(width * width + height * height);
  output.center.set(minX + width / 2, minY + height / 2, 0);
  output.radius = length / 2;
}

export { computeBox, computeSphere };
