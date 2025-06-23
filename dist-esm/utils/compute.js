import * as THREE from 'three';
function bounds(positions) {
    const itemSize = 2;
    const box = new THREE.Box2();
    if (positions[0] === undefined || positions[1] === undefined)
        return box;
    const count = positions.length / itemSize;
    box.min.set(positions[0], positions[1]);
    box.max.set(positions[0], positions[1]);
    for (let i = 0; i < count; i++) {
        const x = positions[i * itemSize + 0];
        const y = positions[i * itemSize + 1];
        if (x === undefined || y === undefined)
            continue;
        box.min.set(Math.min(x, box.min.x), Math.min(y, box.min.y));
        box.max.set(Math.max(x, box.max.x), Math.max(y, box.max.y));
    }
    return box;
}
function computeBox(positions, output) {
    const box = bounds(positions);
    output.min.set(box.min.x, box.min.y, 0);
    output.max.set(box.max.x, box.max.y, 0);
}
function computeSphere(positions, output) {
    const box = bounds(positions);
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
//# sourceMappingURL=compute.js.map