import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ISliceConfig, Slice } from "./Slice";
import { WheelButton } from "./WheelButton";

const radius = 500;
const center = { x: 500, y: 500 };
const spinDurMs = 4000;
const spinDur = spinDurMs / 2;
const sliceOffset = 7;

const getRotationAngle = (i: number, length: number, base = 360): number => {
  return (base * (length - i)) / length;
};

interface IProps {
  slices: ISliceConfig[];
  setSlice: Dispatch<SetStateAction<ISliceConfig | undefined>>;
}

export const Wheel = ({ slices, setSlice }: IProps) => {
  const [isSpinning, setIsSpinning] = useState<boolean>();
  const [sliceIndex, setSliceIndex] = useState<number>(0);
  const [newSliceIndex, setNewSliceIndex] = useState<number>(0);

  const animateRef = useRef<SVGAnimateTransformElement>(null);

  const spin = () => {
    setIsSpinning(true);
    const randomIndex = Math.round(Math.random() * (slices.length - 1));
    setTimeout(() => {
      setIsSpinning(false);
      setSlice(slices[(randomIndex + sliceOffset) % slices.length]);
      setSliceIndex(randomIndex);
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
              values={`
              ${getRotationAngle(sliceIndex, slices.length)} 500 500;
              ${90 + getRotationAngle(sliceIndex, slices.length)} 500 500;
              ${540 + getRotationAngle(sliceIndex, slices.length)} 500 500;
              ${
                720 + getRotationAngle(sliceIndex, slices.length) + getRotationAngle(newSliceIndex, slices.length)
              } 500 500
              `}
              keyTimes={"0;0.3;0.6;1"}
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
