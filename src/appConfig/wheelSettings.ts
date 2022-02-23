export const radius = 500;
export const center = { x: radius, y: radius };
// Change spinDurMs to change the duration of the total rotation. That is, time until a word is selected.
export const spinDurMs = 20000;
export const spinDur = spinDurMs / 1000;
// Change spins to change the number of times the wheels rotate
export const spins = 10;

export const sliceEdgeRadius = 12;

export const brakeLength = 160;
export const brakeOverlap = 40;
export const brakeRootRadius = 20;
export const initialBrakeAngle = -7.2;
export const baseBrakeAngle = -7.2;
export const maxBrakeAngle = -40;
export const brakeWidth = 10;

const wheelOffset = -1 / 4;
export const thetaOffsetRad = 2 * Math.PI * wheelOffset;
export const thetaOffsetDeg = 360 * wheelOffset;
