import { useState } from "react";
import { ISliceConfig, Slice } from "./Slice";
import { WheelButton } from "./WheelButton";

const radius = 500;
const center = { x: 500, y: 500 };

export const Wheel = ({ slices }: { slices: ISliceConfig[] }) => {
  const [isSpinning, setIsSpinning] = useState<boolean>();

  return (
    <>
      <svg height="100%" width="100%" viewBox="0 0 1000 1000">
        <g className={isSpinning ? "App-logo" : ""}>
          {slices.map((s, i) => (
            <Slice key={i} sliceCount={slices.length} sliceIndex={i} radius={radius} center={center} sliceConfig={s} />
          ))}
        </g>
        <WheelButton setIsSpinning={setIsSpinning} />
      </svg>
    </>
  );
};
