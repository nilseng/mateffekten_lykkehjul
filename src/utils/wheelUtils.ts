import { center } from "../appConfig/wheelSettings";

export const getRandomIndex = (sliceCount: number) => Math.round(Math.random() * (sliceCount - 1));

export const getTotalRotation = (ticks: number, sliceCount: number, base = 360) => (base * ticks) / sliceCount;

export const getTotalTicks = (spins: number, currentIndex: number, newIndex: number, sliceCount: number) =>
  spins * sliceCount + ((currentIndex - newIndex + sliceCount) % sliceCount);

export const getRotationAngle = (i: number, length: number, base = 360): number => (base * (length - i)) / length;

/**
 * Calculates constant radial acceleration based on an inital angle, total rotation and rotation duration.
 * The calculation is based on the equations of motion for constant acceleration applied to circular motion.
 * Assumes the final angular velocity to be 0.
 * @param theta The total rotation of the wheel
 * @param theta0 The initial angle of the wheel before the rotation
 * @param t Duration of the rotation. t=1 by default since the keyTimes parameter of SVG animateTransform goes from 0 to 1.
 * @returns constant radial acceleration
 */
export const getTotalAccelleration = (theta: number, theta0: number = 0, t = 1): number =>
  (2 * (theta0 - theta)) / Math.pow(t, 2);

/**
 * Calculates the inital radial speed assuming that the final speed is 0.
 * @param accelleration Constant radial acceleration
 * @param t Rotation duration
 * @returns Inital radial speed
 */
export const getInitialVelocity = (accelleration: number, t = 1) => -accelleration * t;

/**
 * Calculates the angular speed after one more tick given the current speed, total acceleration and slice angle.
 * @param v0 Current radial speed.
 * @param accelleration Total constant acceleration for the rotation
 * @param sliceAngle The angle covered by each slice.
 * @returns The angular speed after one more tick.
 */
export const getVelocity = (v0: number, accelleration: number, sliceAngle: number): number => {
  const v0squared = Math.pow(v0, 2) + 2 * accelleration * sliceAngle;
  if (v0squared < 0) {
    throw new RangeError("Invalid arguments. (For instance too low acceleration a and/or initial velocity v0.)");
  }
  return Math.sqrt(v0squared);
};

/**
 * Calculates the time needed to rotate the slice angle given the current and next speed.
 * @param sliceAngle The angle covered by each slice.
 * @param v_curr Current radial speed.
 * @param v_next The angular speed after one more tick.
 * @returns time between 2 ticks
 */
export const getTickTime = (sliceAngle: number, v_curr: number, v_next: number) => (2 * sliceAngle) / (v_curr + v_next);

/**
 * Calculates the angles for each tick in a wheel rotation.
 * @param ticks The total number of ticks
 * @param sliceAngle The angle covered by each slice.
 * @param theta0 The initial wheel rotation
 * @param centerX The x coordinate of the wheel's center
 * @param centerY The y coordinate of the wheel's center
 * @returns Returns a string with a semi colon separated list of angles.
 */

/**
 * Calculates the angles for each tick in a wheel rotation.
 * @param spins Number of whole rotations
 * @param currSliceIndex
 * @param nextSliceIndex
 * @param sliceCount Number of slices in the wheel
 * @param sliceAngle The angle covered by each slice.
 * @param theta0 The initial wheel rotation
 * @param centerX The x coordinate of the wheel's center
 * @param centerY The y coordinate of the wheel's center
 * @returns Returns a string with a semi colon separated list of angles.
 */
export const getRotationAngles = (
  spins: number,
  currSliceIndex: number,
  nextSliceIndex: number,
  sliceCount: number,
  sliceAngle: number,
  theta0: number = 0,
  centerX: number = center.x,
  centerY: number = center.y
): string => {
  const ticks = getTotalTicks(spins, currSliceIndex, nextSliceIndex, sliceCount);
  let angles = `${theta0} ${centerX} ${centerY};`;
  for (let i = 1; i < ticks; i++) {
    angles += `${theta0 + i * sliceAngle} ${centerX} ${centerY};`;
  }
  angles += `${theta0 + ticks * sliceAngle} ${centerX} ${centerY}`;
  return angles;
};

/**
 * Finds the angle covered by each slice in the wheel
 * @param sliceCount Number of slices
 * @param base Base - 360 (degrees) by default, could also be 2*Math.PI (radians)
 * @returns the angle covered by each slice in the wheel
 */
export const getSliceAngle = (sliceCount: number, base = 360) => base / sliceCount;

/**
 * Calculates when each tick in the rotation happens.
 * @param spins Number of whole rotations
 * @param currSliceIndex
 * @param nextSliceIndex
 * @param sliceCount Number of slices in the wheel
 * @param theta0 The initial rotation of the wheel before the rotation starts
 * @returns An array tickTimes with times for each tick and a string tickTimeString which is a semi colon separated list with the same values
 */
export const getTickTimes = (
  spins: number,
  currSliceIndex: number,
  nextSliceIndex: number,
  sliceCount: number,
  theta0: number = 0
): { tickTimes: number[]; tickTimeString: string } => {
  const ticks = getTotalTicks(spins, currSliceIndex, nextSliceIndex, sliceCount);
  const sliceAngle = getSliceAngle(sliceCount);
  const totalRotation = getTotalRotation(ticks, sliceCount);
  const theta = theta0 + totalRotation;
  const a = getTotalAccelleration(theta, theta0);
  const initialVelocity = getInitialVelocity(a);
  const velocities = [initialVelocity];
  const tickTimes = [0];
  let tickTimeString = "0;";
  for (let i = 1; i < ticks; i++) {
    const v_next = getVelocity(velocities[i - 1], a, sliceAngle);
    velocities.push(v_next);
    const t_next = tickTimes[i - 1] + getTickTime(sliceAngle, velocities[i - 1], v_next);
    tickTimes.push(t_next);
    tickTimeString += `${t_next};`;
  }
  tickTimes.push(1);
  tickTimeString += "1";
  return { tickTimes, tickTimeString };
};

export const getBrakeRotationAngles = (
  spins: number,
  currSliceIndex: number,
  nextSliceIndex: number,
  sliceCount: number,
  maxAngle: number,
  baseAngle: number = 0,
  initialAngle: number = -10,
  centerX: number = center.x,
  centerY: number = center.y
) => {
  const ticks = getTotalTicks(spins, currSliceIndex, nextSliceIndex, sliceCount);
  let angles = `${initialAngle} ${centerX} ${centerY};${maxAngle} ${centerX} ${centerY};`;
  for (let i = 1; i < ticks; i++) {
    angles += `${baseAngle} ${centerX} ${centerY};${maxAngle} ${centerX} ${centerY};`;
  }
  angles += `${baseAngle} ${centerX} ${centerY};${initialAngle} ${centerX} ${centerY}`;
  return angles;
};

export const getBrakeTickTimes = (
  spins: number,
  currSliceIndex: number,
  nextSliceIndex: number,
  sliceCount: number,
  theta0: number = 0
) => {
  const { tickTimes } = getTickTimes(spins, currSliceIndex, nextSliceIndex, sliceCount, theta0);
  let breakTickTimes = "";
  for (let t = 0; t < tickTimes.length - 1; t++) {
    const delta = (tickTimes[t + 1] - tickTimes[t]) * 0.3;
    breakTickTimes += `${tickTimes[t]};${tickTimes[t] + delta};`;
  }
  breakTickTimes += `${tickTimes[tickTimes.length - 1]};${tickTimes[tickTimes.length - 1]}`;
  return breakTickTimes;
};
