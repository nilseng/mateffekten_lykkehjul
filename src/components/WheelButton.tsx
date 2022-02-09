import { Dispatch, SetStateAction } from "react";

export const WheelButton = ({ setIsSpinning }: { setIsSpinning: Dispatch<SetStateAction<boolean | undefined>> }) => {
  return (
    <g style={{ cursor: "pointer" }} onClick={() => setIsSpinning((s) => !s)}>
      <defs>
        <filter id="innerShadow">
          <feDropShadow dx="0" dy="10" stdDeviation="0" floodOpacity={0.3} />
        </filter>
        <filter id="outerShadow">
          <feDropShadow dx="0" dy="24" stdDeviation="0" floodOpacity={0.3} />
        </filter>
      </defs>
      <circle cx="500" cy="500" r="120" fill="#f8f9fa" style={{ filter: "url(#outerShadow)" }} />
      <circle cx="500" cy="500" r="110" fill="rgb(239, 238, 238)" style={{ filter: "url(#innerShadow)" }} />
      <foreignObject x="390" y="390" width={"220"} height={"220"}>
        <div className="flex items-center w-full h-full">
          <p className="font-bold text-gray-600 p-2">Trykk for å spinne</p>
        </div>
      </foreignObject>
    </g>
  );
};
