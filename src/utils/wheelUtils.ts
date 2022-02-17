export const getRandomIndex = (sliceCount: number) => Math.round(Math.random() * (sliceCount - 1));

export const getTotalRotation = (ticks: number, sliceCount: number, base = 360) => (base * ticks) / sliceCount;

export const getTotalTicks = (spins: number, currentIndex: number, newIndex: number, sliceCount: number) =>
  spins * sliceCount + ((currentIndex - newIndex + sliceCount) % sliceCount);

export const getRotationAngle = (i: number, length: number, base = 360): number => (base * (length - i)) / length;
