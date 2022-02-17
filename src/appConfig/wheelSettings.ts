export const radius = 500;
export const center = { x: radius, y: radius };
export const spinDurMs = 20000;
export const spinDur = spinDurMs / 1000;
export const spins = 10;

export const sliceEdgeRadius = 12;

export const brakeLength = 160;
// Setting deciding how far the brake should overlap with the wheel
export const brakeOverlap = 40;
export const brakeRootRadius = 20;
export const initialBrakeAngle = -7.2;
export const baseBrakeAngle = -7.2;
export const maxBrakeAngle = -40;
export const brakeWidth = 10;

const wheelOffset = -1 / 4;
export const thetaOffsetRad = 2 * Math.PI * wheelOffset;
export const thetaOffsetDeg = 360 * wheelOffset;
