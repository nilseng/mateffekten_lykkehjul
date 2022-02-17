import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  brakeLength,
  brakeOverlap,
  brakeRootRadius,
  brakeWidth,
  center,
  initialBrakeAngle,
  maxBrakeAngle,
  radius,
  sliceEdgeRadius,
  spinDur,
  spinDurMs,
  spins,
} from "../appConfig/wheelSettings";
import { ISliceConfig, Slice } from "./Slice";
import { WheelButton } from "./WheelButton";

const getTotalRotation = (ticks: number, sliceCount: number, base = 360) => {
  return (base * ticks) / sliceCount;
};

const getTotalTicks = (currentIndex: number, newIndex: number, sliceCount: number) => {
  return spins * sliceCount + ((currentIndex - newIndex + sliceCount) % sliceCount);
};

const getRotationAngle = (i: number, length: number, base = 360, offset = 0): number => {
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

const getRotationAngles = (
  ticks: number,
  sliceAngle: number,
  theta0: number = 0,
  centerX: number = center.x,
  centerY: number = center.y
): string => {
  let angles = `${theta0} ${centerX} ${centerY};`;
  for (let i = 1; i < ticks; i++) {
    angles += `${theta0 + i * sliceAngle} ${centerX} ${centerY};`;
  }
  angles += `${theta0 + ticks * sliceAngle} ${centerX} ${centerY}`;
  return angles;
};

const getBreakRotationAngles = (
  ticks: number,
  maxAngle: number,
  baseAngle: number = 0,
  initialAngle: number = -10,
  centerX: number = center.x,
  centerY: number = center.y
) => {
  let angles = `${initialAngle} ${centerX} ${centerY};${maxAngle} ${centerX} ${centerY};`;
  for (let i = 1; i < ticks; i++) {
    angles += `${baseAngle} ${centerX} ${centerY};${maxAngle} ${centerX} ${centerY};`;
  }
  angles += `${baseAngle} ${centerX} ${centerY};${initialAngle} ${centerX} ${centerY};`;
  return angles;
};

const getSliceAngle = (sliceCount: number, base = 360) => base / sliceCount;

const getTickTimes = (
  ticks: number,
  sliceCount: number,
  theta0: number = 0
): { tickTimes: number[]; tickTimeString: string } => {
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

const getBreakTickTimes = (ticks: number, sliceCount: number, theta0: number = 0) => {
  const { tickTimes } = getTickTimes(ticks, sliceCount, theta0);
  let breakTickTimes = "";
  for (let t = 0; t < tickTimes.length - 1; t++) {
    const delta = (tickTimes[t + 1] - tickTimes[t]) * 0.3;
    breakTickTimes += `${tickTimes[t]};${tickTimes[t] + delta};`;
  }
  breakTickTimes += `${tickTimes[tickTimes.length - 1]};${tickTimes[tickTimes.length - 1]}`;
  return breakTickTimes;
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
  const animateBrakeRef = useRef<SVGAnimateTransformElement>(null);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSlice(undefined);
    const randomIndex = Math.round(Math.random() * (slices.length - 1));
    const ticks = getTotalTicks(sliceIndex, randomIndex, slices.length);
    setTicks(ticks);
    setTimeout(() => {
      setIsSpinning(false);
      setSlice(slices[randomIndex]);
      setSliceIndex(randomIndex);
      setTicks(0);
    }, spinDurMs);
    setNewSliceIndex(randomIndex);
  };

  useEffect(() => {
    if (isSpinning) {
      animateRef.current?.beginElement();
      animateBrakeRef.current?.beginElement();
    }
  }, [isSpinning]);

  return (
    <>
      <svg
        height="100%"
        width="100%"
        viewBox={`-${sliceEdgeRadius} -${brakeLength - brakeOverlap + brakeRootRadius} ${1000 + 2 * sliceEdgeRadius} ${
          1000 + 2 * brakeLength - brakeOverlap
        }`}
      >
        <defs>
          <filter id="wheelShadow">
            <feDropShadow dx="0" dy="20" stdDeviation="8" floodOpacity={0.3} />
          </filter>
        </defs>
        <circle cx={center.x} cy={center.y} r={radius} style={{ filter: "url(#wheelShadow)" }} />
        <g transform={`rotate(${getRotationAngle(newSliceIndex, slices.length)} ${center.x} ${center.y})`}>
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
              keyTimes={getTickTimes(ticks, slices.length, getRotationAngle(sliceIndex, slices.length)).tickTimeString}
              dur={spinDur}
              restart="always"
            />
          )}
          {slices.map((s, i) => (
            <Slice key={i} sliceCount={slices.length} sliceIndex={i} radius={radius} center={center} sliceConfig={s} />
          ))}
        </g>
        <WheelButton spin={spin} />
        <g transform={`rotate(${initialBrakeAngle} ${center.x} -${brakeLength - brakeOverlap})`}>
          {isSpinning && (
            <animateTransform
              ref={animateBrakeRef}
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values={getBreakRotationAngles(
                ticks,
                maxBrakeAngle,
                initialBrakeAngle,
                initialBrakeAngle,
                center.x,
                -(brakeLength - brakeOverlap)
              )}
              keyTimes={getBreakTickTimes(ticks, slices.length)}
              dur={spinDur}
              restart="always"
            />
          )}
          <line
            x1={center.x}
            y1={-(brakeLength - brakeOverlap)}
            x2={center.x}
            y2={brakeOverlap}
            stroke="black"
            strokeWidth={brakeWidth}
          />
        </g>
        <circle cx={center.x} cy={-(brakeLength - brakeOverlap)} r={brakeRootRadius} />
      </svg>
    </>
  );
};
