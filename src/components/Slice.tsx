import { useState } from "react";

interface IProps {
  sliceCount: number;
  sliceIndex: number;
  radius: number;
  center: { x: number; y: number };
}

export const Slice = ({ sliceCount, sliceIndex, radius, center }: IProps) => {
  const [theta0] = useState<number>(2 * Math.PI * (sliceIndex / sliceCount));
  const [theta] = useState<number>(2 * Math.PI * ((sliceIndex + 1) / sliceCount));
  const [thetaDeltaDeg] = useState<number>(360 * (1 / sliceCount));

  const [intersection0] = useState<string>(
    `${center.x + radius * Math.cos(theta0)} ${center.y + radius * Math.sin(theta0)}`
  );
  const [intersection] = useState<string>(
    `${center.x + radius * Math.cos(theta)} ${center.y + radius * Math.sin(theta)}`
  );

  return (
    <path
      fill="#C5192D"
      stroke="#C5192D"
      strokeWidth={5}
      d={`M ${center.x},${center.y} 
      L ${intersection0} 
      A ${intersection0} ${thetaDeltaDeg},0,1 ${intersection}
      M ${center.x},${center.y} 
      L ${intersection}
      `}
    />
  );
};
