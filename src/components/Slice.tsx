import { useState } from "react";

interface IProps {
  sliceCount: number;
  sliceIndex: number;
  radius: number;
  center: { x: number; y: number };
  sliceConfig: ISliceConfig;
}

export interface ISliceConfig {
  bgColor: string;
  text: string;
  imageSrc?: string;
  compoundPostfix?: string;
}

export const Slice = ({ sliceCount, sliceIndex, radius, center, sliceConfig }: IProps) => {
  const [theta0] = useState<number>(2 * Math.PI * (sliceIndex / sliceCount));
  const [theta0deg] = useState<number>(360 * (sliceIndex / sliceCount));
  const [theta] = useState<number>(2 * Math.PI * ((sliceIndex + 1) / sliceCount));
  const [thetaDeltaDeg] = useState<number>(360 * (1 / sliceCount));

  const [intersection0X] = useState<number>(center.x + radius * Math.cos(theta0));
  const [intersection0Y] = useState<number>(center.y + radius * Math.sin(theta0));
  const [intersection0] = useState<string>(`${intersection0X}, ${intersection0Y}`);
  const [intersectionX] = useState<number>(center.x + radius * Math.cos(theta));
  const [intersectionY] = useState<number>(center.y + radius * Math.sin(theta));
  const [intersection] = useState<string>(`${intersectionX}, ${intersectionY}`);

  return (
    <g>
      <path
        fill={sliceConfig.bgColor}
        stroke={sliceConfig.bgColor}
        strokeWidth={1}
        d={`M ${center.x},${center.y} 
      L ${intersection0} 
      A ${radius},${radius} ${sliceIndex * thetaDeltaDeg},0,1 ${intersection}
      M ${center.x},${center.y} 
      L ${intersection}
      `}
      />
      {/* TODO: Figure out slice height */}
      <g x={center.x} y={center.y} transform={`rotate(${theta0deg + thetaDeltaDeg / 2} ${center.x} ${center.y})`}>
        <foreignObject
          x={center.x + (sliceConfig.imageSrc ? 0 : 20)}
          y={center.y - (sliceConfig.imageSrc ? 70 : 30)}
          width={radius}
          height={160}
        >
          {sliceConfig.imageSrc && (
            <img className="ml-60" src={sliceConfig.imageSrc} height={160} width={160} alt={sliceConfig.text} />
          )}
          {!sliceConfig.imageSrc && (
            <p className="text-gray-50 font-bold text-left pl-40" style={{ fontSize: "calc(24px + 2vmin)" }}>
              {sliceConfig.text}
            </p>
          )}
        </foreignObject>
      </g>
      <circle cx={intersection0X} cy={intersection0Y} r={12} />
      <circle cx={intersectionX} cy={intersectionY} r={12} />
    </g>
  );
};
