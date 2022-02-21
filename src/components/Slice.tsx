import { useState } from "react";
import { sliceEdgeRadius, thetaOffsetDeg, thetaOffsetRad } from "../appConfig/wheelSettings";
import { getSliceAngle } from "../utils/wheelUtils";

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

const getTheta = (i: number, sliceCount: number, offset: number, base: number) =>
  i * getSliceAngle(sliceCount, base) + offset;

const getIntersectionX = (x0: number, radius: number, theta: number) => x0 + radius * Math.cos(theta);
const getIntersectionY = (y0: number, radius: number, theta: number) => y0 + radius * Math.sin(theta);
const getCoordinateString = (x: number, y: number) => `${x}, ${y}`;

export const Slice = ({ sliceCount, sliceIndex, radius, center, sliceConfig }: IProps) => {
  const [theta0] = useState<number>(getTheta(sliceIndex, sliceCount, thetaOffsetRad, 2 * Math.PI));
  const [theta0deg] = useState<number>(getTheta(sliceIndex, sliceCount, thetaOffsetDeg, 360));
  const [theta] = useState<number>(getTheta(sliceIndex + 1, sliceCount, thetaOffsetRad, 2 * Math.PI));
  const [thetaDeltaDeg] = useState<number>(getSliceAngle(sliceCount, 360));

  const [intersection0X] = useState<number>(getIntersectionX(center.x, radius, theta0));
  const [intersection0Y] = useState<number>(getIntersectionY(center.y, radius, theta0));
  const [intersection0] = useState<string>(getCoordinateString(intersection0X, intersection0Y));
  const [intersectionX] = useState<number>(getIntersectionX(center.x, radius, theta));
  const [intersectionY] = useState<number>(getIntersectionY(center.y, radius, theta));
  const [intersection] = useState<string>(getCoordinateString(intersectionX, intersectionY));

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
      <g x={center.x} y={center.y} transform={`rotate(${theta0deg + thetaDeltaDeg / 2} ${center.x} ${center.y})`}>
        <foreignObject
          x={center.x + (sliceConfig.imageSrc ? 0 : 20)}
          y={center.y - (sliceConfig.imageSrc ? 80 : 30)}
          width={radius}
          height={160}
        >
          {sliceConfig.imageSrc && (
            <div className="flex items-center h-full">
              <img
                className="ml-60"
                src={sliceConfig.imageSrc}
                alt={sliceConfig.text}
                style={{ display: "block", maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
              />
            </div>
          )}
          {!sliceConfig.imageSrc && (
            <p
              className="text-gray-50 font-bold font-custom text-left pl-40"
              style={{ fontSize: "calc(36px + 1vmin)" }}
            >
              {sliceConfig.text}
            </p>
          )}
        </foreignObject>
      </g>
      <circle cx={intersection0X} cy={intersection0Y} r={sliceEdgeRadius} />
      <circle cx={intersectionX} cy={intersectionY} r={sliceEdgeRadius} />
    </g>
  );
};
