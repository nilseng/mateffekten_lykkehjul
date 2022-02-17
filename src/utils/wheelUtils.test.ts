import { getRandomIndex, getRotationAngle, getTotalRotation, getTotalTicks } from "./wheelUtils";

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
