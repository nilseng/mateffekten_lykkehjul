import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ISliceConfig, Slice } from "./Slice";
import { WheelButton } from "./WheelButton";

const radius = 500;
const center = { x: 500, y: 500 };
const spinDurMs = 20000;
const spinDur = spinDurMs / 2;
//TODO: Set this to a random number in an interval?
const spins = 10;

const getTotalRotation = (ticks: number, sliceCount: number, base = 360) => {
  return (base * ticks) / sliceCount;
};

const getTotalTicks = (currentIndex: number, newIndex: number, sliceCount: number) => {
  return spins * sliceCount + ((currentIndex - newIndex + sliceCount) % sliceCount);
};

const getRotationAngle = (i: number, length: number, base = 360, offset = 0.0048): number => {
  return (base * (length - i)) / length - offset * base;
};

// Assumes the final angular velocity to be 0
const getTotalAccelleration = (theta: number, theta0: number = 0, t = 1) => (2 * (theta0 - theta)) / Math.pow(t, 2);

// Assumes the final angular velocity to be 0
const getInitialVelocity = (accelleration: number, t = 1) => -accelleration * t;

// Calculates velocity after one more tick
const getVelocity = (v0: number, accelleration: number, sliceAngle: number) =>
  Math.sqrt(Math.pow(v0, 2) + 2 * accelleration * sliceAngle);

const getTickTime = (sliceAngle: number, v_curr: number, v_next: number) => (2 * sliceAngle) / (v_curr + v_next);

const getRotationAngles = (ticks: number, sliceAngle: number, theta0: number = 0): string => {
  let angles = `${theta0} 500 500;`;
  for (let i = 1; i < ticks; i++) {
    angles += `${theta0 + i * sliceAngle} 500 500;`;
  }
  angles += `${theta0 + ticks * sliceAngle} 500 500`;
  return angles;
};

const getSliceAngle = (sliceCount: number, base = 360) => base / sliceCount;

const getTickTimes = (ticks: number, sliceCount: number, theta0: number = 0): string => {
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
  return tickTimeString + "1";
};

interface IProps {
  slices: ISliceConfig[];
  setSlice: Dispatch<SetStateAction<ISliceConfig | undefined>>;
}

export const Wheel = ({ slices, setSlice }: IProps) => {
  const [isSpinning, setIsSpinning] = useState<boolean>();
  const [sliceIndex, setSliceIndex] = useState<number>(0);
  const [newSliceIndex, setNewSliceIndex] = useState<number>(0);
  const [ticks, setTicks] = useState<number>(0);

  const animateRef = useRef<SVGAnimateTransformElement>(null);

  const spin = () => {
    setIsSpinning(true);
    const randomIndex = Math.round(Math.random() * (slices.length - 1));
    const ticks = getTotalTicks(sliceIndex, randomIndex, slices.length);
    setTicks(ticks);
    setTimeout(() => {
      setIsSpinning(false);
      setSlice(slices[randomIndex]);
      setSliceIndex(randomIndex);
      setTicks(0);
    }, spinDur);
    setNewSliceIndex(randomIndex);
  };

  useEffect(() => {
    if (isSpinning) {
      animateRef.current?.beginElement();
    }
  }, [isSpinning]);

  return (
    <>
      <svg height="100%" width="100%" viewBox="-12 -120 1024 1240">
        <g transform={`rotate(${getRotationAngle(newSliceIndex, slices.length)} 500 500)`}>
          {isSpinning && (
            <animateTransform
              ref={animateRef}
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values={getRotationAngles(
                ticks,
                getSliceAngle(slices.length),
                getRotationAngle(sliceIndex, slices.length)
              )}
              keyTimes={getTickTimes(ticks, slices.length, getRotationAngle(sliceIndex, slices.length))}
              dur={spinDur / 1000}
              restart="always"
            />
          )}
          {slices.map((s, i) => (
            <Slice key={i} sliceCount={slices.length} sliceIndex={i} radius={radius} center={center} sliceConfig={s} />
          ))}
        </g>
        <WheelButton spin={spin} />
        <line x1={500} y1={-120} x2={500} y2={40} stroke="black" strokeWidth={10} />
      </svg>
    </>
  );
};
