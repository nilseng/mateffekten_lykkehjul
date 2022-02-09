import { Dispatch, SetStateAction, useState } from "react";
import { ISliceConfig, Slice } from "./Slice";
import { WheelButton } from "./WheelButton";

const radius = 500;
const center = { x: 500, y: 500 };

interface IProps {
  slices: ISliceConfig[];
  setSlice: Dispatch<SetStateAction<ISliceConfig | undefined>>;
}

export const Wheel = ({ slices, setSlice }: IProps) => {
  const [isSpinning, setIsSpinning] = useState<boolean>();

  const spin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      const randomSliceIndex = Math.round(Math.random() * slices.length - 1);
      setSlice(slices[randomSliceIndex]);
    }, 1000 + 2000 * Math.random());
  };

  return (
    <>
      <svg height="100%" width="100%" viewBox="-12 -12 1024 1024">
        <g className={isSpinning ? "App-logo" : ""}>
          {slices.map((s, i) => (
            <Slice key={i} sliceCount={slices.length} sliceIndex={i} radius={radius} center={center} sliceConfig={s} />
          ))}
        </g>
        <WheelButton spin={spin} />
      </svg>
    </>
  );
};
