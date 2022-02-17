import { maxBrakeAngle, spins } from "../appConfig/wheelSettings";
import {
  getBrakeRotationAngles,
  getBrakeTickTimes,
  getRandomIndex,
  getRotationAngle,
  getRotationAngles,
  getSliceAngle,
  getTickTimes,
  getTotalAccelleration,
  getTotalRotation,
  getTotalTicks,
  getVelocity,
} from "./wheelUtils";

test("getRandomIndex should return a random index in the correct interval", () => {
  const sliceCount = 10;
  const randomIndex = getRandomIndex(sliceCount);
  expect(randomIndex).toBeLessThan(sliceCount);
  expect(randomIndex).toBeGreaterThanOrEqual(0);
});

test("getTotalRotation should return the correct rotation based on number of ticks, sliceCount and base", () => {
  const sliceCount = 8;
  const ticks = 12;
  const base = 2 * Math.PI;
  const rotation = getTotalRotation(ticks, sliceCount, base);
  expect(rotation).toBeCloseTo((base * ticks) / sliceCount);
});

test("getTotalTicks should return the correct number of ticks", () => {
  const spins = 3;
  const i0 = 3;
  const i = 1;
  const sliceCount = 4;
  const ticks = getTotalTicks(spins, i0, i, sliceCount);
  expect(ticks).toBeGreaterThanOrEqual(spins * sliceCount);
  expect(ticks).toBeLessThanOrEqual((spins + 1) * sliceCount);
});

test("getRotationAngle should return the correct rotation based on the given index", () => {
  const i0 = 7;
  const sliceCount = 20;
  const base = 2 * Math.PI;
  const angle0 = getRotationAngle(i0, sliceCount, base);
  expect(angle0).toBeGreaterThan(0);
  expect(angle0).toBeLessThan(base);

  const i = 0;
  const angle = getRotationAngle(i, sliceCount, base);
  expect(angle).toBeCloseTo(base);
  expect(angle0).toBeLessThan(angle);
});

test("getTotalAcceleration should return total radial acceleration", () => {
  const angle0 = 45;
  const rotation = 1440;
  const t = 1;
  const a = getTotalAccelleration(rotation, angle0, t);
  expect(a).toBeLessThan(0);

  const initialSpeed = -a * t;
  const finalSpeed = 0;
  expect(initialSpeed + a * t).toBeCloseTo(finalSpeed);
});

test("getVelocity should throw on invalid arguments", () => {
  const v0 = 100;
  const a = -3600;
  expect(() => getVelocity(v0, a, 36)).toThrow();
});

test("getVelocity should return the speed after the next tick", () => {
  const v0 = 720;
  const a = -3600;
  expect(getVelocity(v0, a, 36)).toBeLessThan(v0);
});

test("getRotationAngles should return a semi colon separated list of angles and rotation points", () => {
  const sliceCount = 10;
  const currIndex = 0;
  const nextIndex = 4;
  const angles = getRotationAngles(spins, currIndex, nextIndex, sliceCount, getSliceAngle(sliceCount));
  expect(angles.split(";").length).toEqual(getTotalTicks(spins, currIndex, nextIndex, sliceCount) + 1);
});

test("getTickTimes should return a semi colon separated list of times between 0 and 1", () => {
  const sliceCount = 10;
  const currIndex = 0;
  const nextIndex = 4;
  const { tickTimes, tickTimeString } = getTickTimes(spins, currIndex, nextIndex, sliceCount);
  expect(tickTimes.length).toBe(getTotalTicks(spins, currIndex, nextIndex, sliceCount) + 1);
  expect(tickTimeString.split(";").length).toEqual(getTotalTicks(spins, currIndex, nextIndex, sliceCount) + 1);
});

test("getBrakeRotationAngles should return a semi colon separated list of angles and rotation points", () => {
  const sliceCount = 10;
  const currIndex = 0;
  const nextIndex = 4;
  const angles = getBrakeRotationAngles(spins, currIndex, nextIndex, sliceCount, maxBrakeAngle);
  expect(angles.split(";").length).toEqual(2 * (getTotalTicks(spins, currIndex, nextIndex, sliceCount) + 1));
});

test("getBrakeTickTimes should return a semi colon separated list of times between 0 and 1", () => {
  const sliceCount = 10;
  const currIndex = 0;
  const nextIndex = 4;
  const tickTimeString = getBrakeTickTimes(spins, currIndex, nextIndex, sliceCount);
  expect(tickTimeString.split(";").length).toEqual(2 * (getTotalTicks(spins, currIndex, nextIndex, sliceCount) + 1));
});
