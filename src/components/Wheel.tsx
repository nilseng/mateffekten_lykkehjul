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
import {
  getBrakeRotationAngles,
  getBrakeTickTimes,
  getRandomIndex,
  getRotationAngle,
  getRotationAngles,
  getSliceAngle,
  getTickTimes,
} from "../utils/wheelUtils";
import { ISliceConfig, Slice } from "./Slice";
import { WheelButton } from "./WheelButton";

interface IProps {
  slices: ISliceConfig[];
  setSlice: Dispatch<SetStateAction<ISliceConfig | undefined>>;
}

export const Wheel = ({ slices, setSlice }: IProps) => {
  const [isSpinning, setIsSpinning] = useState<boolean>();
  const [sliceIndex, setSliceIndex] = useState<number>(0);
  const [newSliceIndex, setNewSliceIndex] = useState<number>(0);

  const animateRef = useRef<SVGAnimateTransformElement>(null);
  const animateBrakeRef = useRef<SVGAnimateTransformElement>(null);

  const spin = () => {
    //If the wheel is already spinning, do nothing
    if (isSpinning) return;
    setIsSpinning(true);
    setSlice(undefined);
    const randomIndex = getRandomIndex(slices.length);
    setTimeout(() => {
      setIsSpinning(false);
      setSlice(slices[randomIndex]);
      setSliceIndex(randomIndex);
    }, spinDurMs);
    setNewSliceIndex(randomIndex);
  };

  /* Hack to make sure that the browser does not begin the animation at the wrong point in time.
    Needed in OSX chrome Version 98.0.4758.80 (Official Build) (arm64) and probably other browsers as well.
  */
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
                spins,
                sliceIndex,
                newSliceIndex,
                slices.length,
                getSliceAngle(slices.length),
                getRotationAngle(sliceIndex, slices.length)
              )}
              keyTimes={
                getTickTimes(
                  spins,
                  sliceIndex,
                  newSliceIndex,
                  slices.length,
                  getRotationAngle(sliceIndex, slices.length)
                ).tickTimeString
              }
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
              values={getBrakeRotationAngles(
                spins,
                sliceIndex,
                newSliceIndex,
                slices.length,
                maxBrakeAngle,
                initialBrakeAngle,
                initialBrakeAngle,
                center.x,
                -(brakeLength - brakeOverlap)
              )}
              keyTimes={getBrakeTickTimes(
                spins,
                sliceIndex,
                newSliceIndex,
                slices.length,
                getRotationAngle(sliceIndex, slices.length)
              )}
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
