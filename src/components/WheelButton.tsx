import { useState } from "react";

export const WheelButton = ({ spin }: { spin: () => void }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <g
      style={{ cursor: "pointer" }}
      onClick={spin}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onMouseLeave={() => setIsClicked(false)}
      onTouchStart={() => setIsClicked(true)}
      onTouchCancel={() => setIsClicked(false)}
      onTouchEnd={() => setIsClicked(false)}
    >
      <defs>
        <filter id="innerShadow">
          <feDropShadow dx="0" dy="20" stdDeviation="0" floodOpacity={0.3} />
        </filter>
        <filter id="outerShadow">
          <feDropShadow dx="0" dy="32" stdDeviation="0" floodOpacity={0.3} />
        </filter>
      </defs>
      <circle cx="500" cy="500" r="160" fill="#f8f9fa" style={{ filter: "url(#outerShadow)" }} />
      <circle
        cx="500"
        cy="500"
        r="140"
        fill="rgb(239, 238, 238)"
        style={{ filter: isClicked ? "" : "url(#innerShadow)" }}
      />
      <foreignObject x="360" y="360" width={"280"} height={"280"}>
        <div className="flex items-center justify-center w-full h-full p-4">
          <p className="font-bold font-custom text-gray-600" style={{ fontSize: "calc(24px + 2vmin)" }}>
            Trykk for å spinne
          </p>
        </div>
      </foreignObject>
    </g>
  );
};
