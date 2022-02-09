export const WheelButton = ({ spin }: { spin: () => void }) => {
  return (
    <g style={{ cursor: "pointer" }} onClick={spin}>
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
        <div className="flex items-center justify-center w-full h-full p-4">
          <p className="font-bold text-gray-600" style={{ fontSize: "calc(16px + 2vmin)" }}>
            Trykk for å spinne
          </p>
        </div>
      </foreignObject>
    </g>
  );
};
